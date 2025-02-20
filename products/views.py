from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from .models import Product
from .serializers import ProductSerializer

# Product Create View (Only for Vendors)
class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        if self.request.user.role == 'vendor':  # Ensure only vendors can add products
            serializer.save(vendor=self.request.user)
        else:
            return Response({"error": "Only vendors can add products."}, status=status.HTTP_403_FORBIDDEN)

# Vendor Dashboard (List Vendor's Products)
class VendorDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'vendor':  
            return Response({"error": "Unauthorized access."}, status=status.HTTP_403_FORBIDDEN)
        products = Product.objects.filter(vendor=request.user)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

# User Dashboard (Just a Welcome Message)
class UserDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role != 'user':  
            return Response({"error": "Unauthorized access."}, status=status.HTTP_403_FORBIDDEN)
        return Response({"message": "Welcome to User Dashboard!"})
