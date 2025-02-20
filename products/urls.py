from django.urls import path
from .views import ProductCreateView, VendorDashboardView, UserDashboardView

urlpatterns = [
    path('vendor/products/', ProductCreateView.as_view(), name='add-product'),
    path('vendor/dashboard/', VendorDashboardView.as_view(), name='vendor-dashboard'),
    path('user/dashboard/', UserDashboardView.as_view(), name='user-dashboard'),
]
