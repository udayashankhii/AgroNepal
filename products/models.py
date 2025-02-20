from django.db import models
from django.conf import settings  # Import settings to get the user model

class Product(models.Model):
    CATEGORY_CHOICES = [
        ("Fruits", "Fruits"),
        ("Vegetables", "Vegetables"),
        ("Spices", "Spices"),
        ("Herbs", "Herbs"),
        ("Honey", "Honey"),
        ("Roots & Tubers", "Roots & Tubers"),
        ("Grains", "Grains"),
    ]

    vendor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'vendor'})
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to="product_images/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
