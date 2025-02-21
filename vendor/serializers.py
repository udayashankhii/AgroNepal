from rest_framework import serializers
from .models import Vendor, Product

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'shop_name', 'phone_number', 'address', 'registration_date', 'is_active']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'category', 'image', 'created_at', 'updated_at']
        read_only_fields = ['vendor'] 
