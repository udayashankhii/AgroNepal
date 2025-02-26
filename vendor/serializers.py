from rest_framework import serializers
from .models import Vendor, Product

class VendorSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    registration_date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Vendor
        fields = [
            'id', 
            'user_email',
            'shop_name', 
            'phone_number', 
            'address', 
            'registration_date', 
            'is_active', 
            'is_verified',
            'pan_number_image'
        ]

class ProductSerializer(serializers.ModelSerializer):
    shop_name = serializers.CharField(source='vendor.shop_name', read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'category', 'image', 'created_at', 'updated_at', 'shop_name']
        read_only_fields = ['vendor']
