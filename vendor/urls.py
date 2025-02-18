from django.urls import path
from . import views
from .views import ProductList, VendorDashboardAPI, VendorProfileAPI, VendorProductsAPI, VendorProductDetailAPI

app_name = 'vendor'

urlpatterns = [
    path('dashboard/', views.vendor_dashboard, name='dashboard'),
    path('api/register/', views.vendor_registration, name='vendor-registration'),  # ✅ Fixed API path
    path('product/add/', views.add_product, name='add_product'),
    path('product/edit/<int:pk>/', views.edit_product, name='edit_product'),
    path('product/delete/<int:pk>/', views.delete_product, name='delete_product'),

    # API Endpoints
    path('api/products/', ProductList.as_view(), name='product-list'),  # Public product list
    path('api/dashboard/', VendorDashboardAPI.as_view(), name='vendor-dashboard-api'),
    path('api/profile/', VendorProfileAPI.as_view(), name='vendor-profile-api'),

    # Vendor-specific product endpoints
    path('api/vendor/products/', VendorProductsAPI.as_view(), name='vendor-products-api'),
    path('api/vendor/products/<int:pk>/', VendorProductDetailAPI.as_view(), name='vendor-product-detail-api'),
]
