from rest_framework import serializers
from .models import Payment

class KhaltiPaymentSerializer(serializers.Serializer):
    amount = serializers.IntegerField(min_value=1)
    purchase_order_id = serializers.CharField(max_length=100)
    purchase_order_name = serializers.CharField(max_length=255)
    return_url = serializers.URLField()

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"
