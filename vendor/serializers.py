from rest_framework import serializers
from .models import Vendor, Product
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class VendorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'shop_name', 'phone_number', 'address', 
                 'registration_date', 'is_active']
        read_only_fields = ['registration_date', 'is_active']

class ProductSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source='vendor.shop_name', read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'vendor', 'vendor_name', 'name', 'description', 
                 'price', 'stock', 'category', 'image', 'created_at', 
                 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def validate_price(self, value):
        """Validate that price is positive"""
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero")
        return value

    def validate_stock(self, value):
        """Validate that stock is non-negative"""
        if value < 0:
            raise serializers.ValidationError("Stock cannot be negative")
        return value
