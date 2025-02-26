import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Payment
from .serializers import KhaltiPaymentSerializer

class KhaltiPaymentInitiateView(APIView):
    def post(self, request):
        serializer = KhaltiPaymentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        payment_data = {
            "return_url": data["return_url"],
            "amount": data["amount"],
            "purchase_order_id": data["purchase_order_id"],
            "purchase_order_name": data["purchase_order_name"],
            "website_url": "http://localhost:5173",  # Change in production
        }

        headers = {
            "Authorization": f"Key {settings.KHALTI_SECRET_KEY}",
            "Content-Type": "application/json",
        }

        try:
            khalti_url = "https://a.khalti.com/api/v2/epayment/initiate/"
            response = requests.post(khalti_url, json=payment_data, headers=headers)

            if response.status_code == 200:
                return Response(response.json(), status=status.HTTP_200_OK)

            return Response(response.json(), status=response.status_code)

        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class KhaltiPaymentVerifyView(APIView):
    def post(self, request):
        # Debugging print statement to check received data
        print("Received data for verification:", request.data)
        
        pidx = request.data.get("pidx")

        if not pidx:
            return Response({"error": "Missing pidx"}, status=status.HTTP_400_BAD_REQUEST)

        headers = {
            "Authorization": f"Key {settings.KHALTI_SECRET_KEY}",
            "Content-Type": "application/json",
        }

        try:
            verify_url = f"https://a.khalti.com/api/v2/epayment/lookup/"
            response = requests.post(verify_url, json={"pidx": pidx}, headers=headers)

            if response.status_code == 200:
                response_data = response.json()
                payment_status = response_data.get("status")
                # Log the full response for debugging
                print("Khalti Verification Response:", response_data)

                if payment_status == "Completed":
                    Payment.objects.create(
                        amount=response_data["total_amount"],
                        purchase_order_id=response_data["purchase_order_id"],
                        transaction_id=pidx,
                        status="COMPLETED",
                    )
                    return Response({"message": "Payment verified successfully"}, status=status.HTTP_200_OK)

                elif payment_status == "Pending":
                    return Response({"error": "Payment is still pending"}, status=status.HTTP_400_BAD_REQUEST)

                elif payment_status == "Failed":
                    return Response({"error": "Payment failed"}, status=status.HTTP_400_BAD_REQUEST)

                else:
                    return Response({"error": "Unknown payment status"}, status=status.HTTP_400_BAD_REQUEST)

            return Response(response.json(), status=response.status_code)

        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
