from django.shortcuts import render

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

@login_required
def vendor_dashboard(request):
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
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            vendor = Vendor.objects.get(user=request.user)
            products = Product.objects.filter(vendor=vendor)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request):
        try:
            vendor = Vendor.objects.get(user=request.user)
            serializer = ProductSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(vendor=vendor)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Vendor.DoesNotExist:
            return Response(
                {"error": "Vendor profile not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
