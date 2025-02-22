# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Vendor, Product
from .forms import VendorRegistrationForm, ProductForm
from .serializers import ProductSerializer, VendorSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.http import Http404

@login_required  # Add a space here
def vendor_dashboard(request):  # And start function definition on new line
    try:
        vendor = Vendor.objects.get(user=request.user)
        products = Product.objects.filter(vendor=vendor)
        return render(request, 'vendor/dashboard.html', {
            'vendor': vendor,
            'products': products
        })
    except Vendor.DoesNotExist:
        return redirect('vendor_registration')

@login_required
def vendor_registration(request):
    if request.method == 'POST':
        form = VendorRegistrationForm(request.POST)
        if form.is_valid():
            vendor = form.save(commit=False)
            vendor.user = request.user
            vendor.save()
            messages.success(request, 'Vendor registration successful!')
            return redirect('vendor_dashboard')
    else:
        form = VendorRegistrationForm()
    return render(request, 'vendor/registration.html', {'form': form})

@login_required
def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            vendor = Vendor.objects.get(user=request.user)
            product.vendor = vendor
            product.save()
            messages.success(request, 'Product added successfully!')
            return redirect('vendor_dashboard')
    else:
        form = ProductForm()
    return render(request, 'vendor/add_product.html', {'form': form})

@login_required
def edit_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product updated successfully!')
            return redirect('vendor_dashboard')
    else:
        form = ProductForm(instance=product)
    return render(request, 'vendor/edit_product.html', {'form': form})

@login_required
def delete_product(request, pk):
    product = Product.objects.get(pk=pk)
    product.delete()
    messages.success(request, 'Product deleted successfully!')
    return redirect('vendor_dashboard')



class ProductList(APIView):
    """
    Public API endpoint to list all products
    No authentication required
    """
    permission_classes = []  # Empty list means no permissions required

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class VendorDashboardAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Welcome to Vendor Dashboard!"})

class VendorProfileAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            vendor = Vendor.objects.get(user=request.user)
            serializer = VendorSerializer(vendor)
            return Response(serializer.data)
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

class VendorProductsAPI(APIView):
    permission_classes = []  # For GET requests

    def get(self, request):
        try:
            # Get all products
            products = Product.objects.select_related('vendor').all()
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
            
        except Product.DoesNotExist:
            return Response(
                {"error": "No products found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "Error fetching products"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    def post(self, request):
        try:
            # Check if the user is authenticated
            if not request.user.is_authenticated:
                return Response(
                    {"error": "Authentication required"}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Get the vendor
            vendor = Vendor.objects.get(user=request.user)
            
            # Create a mutable copy of request data
            data = request.data.copy()
            # Explicitly set the vendor ID in the data
            data['vendor'] = vendor.id
            
            # Create serializer with the modified data
            serializer = ProductSerializer(data=data)
            
            if serializer.is_valid():
                # Save with the vendor relationship
                serializer.save(vendor=vendor)  # This ensures the vendor relationship is set
                return Response(
                    serializer.data, 
                    status=status.HTTP_201_CREATED
                )
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    # Keep other methods (put, delete) with authentication if needed
    permission_classes_by_method = {
        'POST': [IsAuthenticated],
        'PUT': [IsAuthenticated],
        'DELETE': [IsAuthenticated]
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_method[self.request.method]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

class VendorProductDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, vendor):
        try:
            return Product.objects.get(pk=pk, vendor=vendor)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        try:
            vendor = Vendor.objects.get(user=request.user)
            product = self.get_object(pk, vendor)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )


   

    def put(self, request, pk):
        try:
            vendor = Vendor.objects.get(user=request.user)
            product = self.get_object(pk, vendor)
            serializer = ProductSerializer(product, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, pk):
        try:
            vendor = Vendor.objects.get(user=request.user)
            product = self.get_object(pk, vendor)
            product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

class VendorRegistrationAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Check if vendor already exists
            if Vendor.objects.filter(user=request.user).exists():
                return Response(
                    {"error": "Vendor profile already exists"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Create new vendor
            vendor = Vendor.objects.create(
                user=request.user,
                shop_name=request.data.get('shop_name'),
                description=request.data.get('description')
            )
            
            return Response({
                'message': 'Vendor registration successful!',
                'vendor': {
                    'id': vendor.id,
                    'shop_name': vendor.shop_name,
                    'description': vendor.description
                }
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class ProductUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, vendor):
        try:
            return Product.objects.get(pk=pk, vendor=vendor)
        except Product.DoesNotExist:
            raise Http404

    def put(self, request, pk):
        try:
            vendor = Vendor.objects.get(user=request.user)
            product = self.get_object(pk, vendor)
            serializer = ProductSerializer(product, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

class ProductDetailAPI(APIView):
    """
    Public API endpoint to view details of a specific product
    No authentication required
    """
    permission_classes = []  # Empty list means no permissions required

    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(
                {"error": "Product not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": "Error fetching product"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

