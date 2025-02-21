from django.urls import path
from . import views
from .views import (
    ProductList,
    ProductDetailAPI,
    VendorDashboardAPI,
    VendorProfileAPI,
    VendorProductsAPI,
    VendorProductDetailAPI,
    VendorRegistrationAPI
)

app_name = 'vendor'

urlpatterns = [
    # Public product endpoints
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailAPI.as_view(), name='product-detail'),

    # Vendor-specific endpoints
    path('vendor/dashboard/', VendorDashboardAPI.as_view(), name='vendor-dashboard-api'),
    path('vendor/profile/', VendorProfileAPI.as_view(), name='vendor-profile-api'),
    path('vendor/register/', VendorRegistrationAPI.as_view(), name='vendor-registration-api'),
    
    # Vendor products endpoints
    path('vendor/products/', VendorProductsAPI.as_view(), name='vendor-products-api'),
    path('vendor/products/<int:pk>/', VendorProductDetailAPI.as_view(), name='vendor-product-detail-api'),
    
    # Regular vendor views
    path('vendor/product/add/', views.add_product, name='add_product'),
    path('vendor/product/edit/<int:pk>/', views.edit_product, name='edit_product'),
    path('vendor/product/delete/<int:pk>/', views.delete_product, name='delete_product'),
]
