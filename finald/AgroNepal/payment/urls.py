from django.urls import path
from .views import KhaltiPaymentInitiateView, KhaltiPaymentVerifyView

urlpatterns = [
    path("khalti/initiate/", KhaltiPaymentInitiateView.as_view(), name="khalti-initiate"),
    path("khalti/verify/", KhaltiPaymentVerifyView.as_view(), name="khalti-verify"),
]
