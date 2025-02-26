from rest_framework import status
import requests
import logging
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, OTPVerifySerializer, LoginSerializer, GoogleLoginSerializer
from .models import User
from django.core.mail import send_mail
from rest_framework_simplejwt.exceptions import TokenError
from django.core.mail import send_mail
from django.conf import settings
from urllib.parse import urlencode
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from urllib.parse import urlencode

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.is_active = False  # Set the user as inactive until OTP is verified
        user.generate_otp()  # Generate OTP for the user
        user.save()

        send_mail(
            "Your OTP Code",
            f"Your OTP is {user.otp}",
            "agronepalss@gmail.com",  # Sender email
            [user.email],
            fail_silently=False,
        )

        return Response({"message": "User created successfully. OTP sent to your email."}, status=status.HTTP_201_CREATED)

class OTPVerifyView(APIView):
    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = User.objects.get(email=serializer.validated_data["email"])

            # Check if OTP matches
            if user.otp != serializer.validated_data["otp"]:
                return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

            # Check if OTP is expired
            if user.otp_expiry and user.otp_expiry < timezone.now():
                return Response({"error": "OTP expired."}, status=status.HTTP_400_BAD_REQUEST)

            # Mark user as verified and active
            user.is_verified = True
            user.is_active = True
            user.otp = None  # Clear OTP after verification
            user.otp_expiry = None
            user.save()

            # Generate JWT Tokens
            tokens = RefreshToken.for_user(user)
            return Response({
                "access": str(tokens.access_token),
                "refresh": str(tokens),
                "role": user.role
            }, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if data["role"] == "user":
            return Response({
                "access": data["access"],
                "refresh": data["refresh"],
                "role": data["role"],
                "redirect": "user-dashboard"
            }, status=status.HTTP_200_OK)
        elif data["role"] == "vendor":
            return Response({
                "access": data["access"],
                "refresh": data["refresh"],
                "role": data["role"],
                "redirect": "vendor-dashboard"
            }, status=status.HTTP_200_OK)

class LogoutView(APIView):
    def post(self, request):
        try:
            # Get the refresh token from the request header
            refresh_token = request.data.get("refresh_token")

            if not refresh_token:
                return Response({"error": "No refresh token provided."}, status=status.HTTP_400_BAD_REQUEST)

            # Create a RefreshToken object from the provided token
            token = RefreshToken(refresh_token)

            # Blacklist the refresh token (invalidate it)
            token.blacklist()

            return Response({"message": "Successfully logged out."}, status=status.HTTP_200_OK)

        except TokenError as e:
            return Response({"error": f"Token error: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": f"Unexpected error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

logger = logging.getLogger(__name__)
class GoogleLoginView(APIView):
    def get(self, request):
        # Check if 'code' is present (callback URL)
        code = request.GET.get('code')

        if code:
            # If we have the authorization code, handle the callback
            return self.handle_google_callback(code)

        else:
            # Otherwise, initiate the Google OAuth2 flow
            return self.initiate_google_login()

    def initiate_google_login(self):
        # Initiate the Google OAuth2 login
        authorization_url = "https://accounts.google.com/o/oauth2/auth"
        scopes = ["email", "profile"]
        params = {
            "response_type": "code",
            "client_id": settings.GOOGLE_CLIENT_ID,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,  # Ensure this matches Google's settings
            "scope": " ".join(scopes),
            "access_type": "offline"
        }
        # Redirect user to Google's OAuth2 login page
        return redirect(f"{authorization_url}?{urlencode(params)}")

    def handle_google_callback(self, code):
        # Step 1: Exchange authorization code for access token
        try:
            logger.info(f"Received authorization code: {code}")

            token_url = 'https://oauth2.googleapis.com/token'
            payload = {
                "code": code,
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uri": settings.GOOGLE_REDIRECT_URI,
                "grant_type": "authorization_code"
            }

            response = requests.post(token_url, data=payload)
            response_data = response.json()

            if response.status_code != 200:
                logger.error(f"Failed to retrieve access token: {response_data}")
                return Response({"message": "Failed to retrieve access token", "error": response_data}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            access_token = response_data.get('access_token')
            logger.info(f"Access token received: {access_token}")

            # Step 2: Fetch user info from Google
            user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
            user_info_response = requests.get(user_info_url, params={'access_token': access_token})

            if user_info_response.status_code != 200:
                logger.error("Failed to fetch user information from Google")
                return Response({"message": "Failed to fetch user information from Google"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            user_data = user_info_response.json()
            email = user_data.get('email')
            name = user_data.get('name')

            if not email:
                logger.error("Google did not return an email address")
                return Response({"message": "Google did not return an email address"}, status=status.HTTP_400_BAD_REQUEST)

            logger.info(f"User authenticated: {email}, {name}")

            # Handle user creation or login logic here
            # Check if user exists, otherwise create a new user
            user, created = User.objects.get_or_create(email=email)

            # If it's a new user, set their role as 'user' (default role)
            if created:
                user.name = name
                user.role = 'user'  # Set the default role to 'user'
                user.is_active = True
                user.is_verified = True
                user.save()

            # Step 3: Send a successful login notification email to the user
            send_mail(
                "AgroNepal - Login Successful",
                f"Hello {name},\n\nYou have successfully logged into AgroNepal using your Google account.\n\nIf this wasn't you, please secure your account immediately.",
                "agronepalss@gmail.com",  # Sender email (set your sender email here)
                [email],  # Receiver email (user's email from Google)
                fail_silently=False,
            )

            # Step 4: Generate JWT tokens
            tokens = RefreshToken.for_user(user)
            return Response({
                "message": "User authenticated successfully",
                "accessToken": str(tokens.access_token),
                "refreshToken": str(tokens),
                "role": user.role,
            }, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            logger.error(f"Request exception: {str(e)}")
            return Response({"message": "Internal server error", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
