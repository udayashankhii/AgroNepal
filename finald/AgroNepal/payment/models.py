from django.db import models

class Payment(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("COMPLETED", "Completed"),
        ("FAILED", "Failed"),
    ]

    amount = models.PositiveIntegerField()
    purchase_order_id = models.CharField(max_length=100, unique=True)
    purchase_order_name = models.CharField(max_length=255)
    transaction_id = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.purchase_order_id} - {self.status}"
