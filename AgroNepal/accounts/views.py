from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from .serializers import OTPVerifySerializer, LoginSerializer, GoogleLoginSerializer, RegisterSerializer
from rest_framework_simplejwt.exceptions import InvalidToken

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        send_mail(
            "Your OTP Code",
            f"Your OTP is {user.otp}",
            "your-email@example.com",  # Sender email
            [user.email],
            fail_silently=False,
        )

class OTPVerifyView(APIView):
    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = User.objects.get(email=serializer.validated_data["email"], otp=serializer.validated_data["otp"])

            if user.otp_expiry < timezone.now():
                return Response({"error": "OTP expired."}, status=status.HTTP_400_BAD_REQUEST)

            user.is_verified = True
            user.is_active = True
            user.otp = None
            user.save()

            tokens = RefreshToken.for_user(user)
            return Response({"access": str(tokens.access_token), "refresh": str(tokens)})

        except User.DoesNotExist:
            return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


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
        
        except InvalidToken:
            return Response({"error": "Invalid refresh token."}, status=status.HTTP_400_BAD_REQUEST)


class GoogleLoginView(APIView):
    def post(self, request):
        serializer = GoogleLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]

        user, created = User.objects.get_or_create(email=email)

        if created:
            user.role = "user"  # Assign a default role
            user.save()
            return Response({
                "message": "Please select your role ('user' or 'vendor') and send it to us for registration."
            }, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_verified:
            user.generate_otp()
            send_mail("Your OTP Code", f"Your OTP is {user.otp}", "your-email@example.com", [user.email])
            return Response({"message": "OTP sent to your email."})

        if user.role == "vendor" and not user.is_profile_complete:
            return Response({
                "message": "Vendor registration is incomplete. Please fill out the registration form."
            }, status=status.HTTP_400_BAD_REQUEST)

        tokens = RefreshToken.for_user(user)
        return Response({
            "access": str(tokens.access_token),
            "refresh": str(tokens),
            "role": user.role
        })
        
