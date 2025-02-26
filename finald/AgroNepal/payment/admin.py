from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("purchase_order_id", "amount", "status", "created_at")
    search_fields = ("purchase_order_id", "transaction_id")
    list_filter = ("status", "created_at")
