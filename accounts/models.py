# models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)  # Email must be unique
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(
        max_length=10,
        choices=[('user', 'User'), ('vendor', 'Vendor')],
        default='user'
    )

    # Use email as the primary identifier for authentication
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']  # Required fields during user creation (username, phone_number)

    def __str__(self):
        return f"{self.username} ({self.role})"
