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
    path('products/public/', ProductList.as_view(), name='product-list'),
    path('products/public/<int:pk>/', ProductDetailAPI.as_view(), name='product-detail'),
    
    # Vendor products endpoints
    path('products/', VendorProductsAPI.as_view(), name='vendor-products-api'),
    path('products/<int:pk>/', VendorProductDetailAPI.as_view(), name='vendor-product-detail-api'),
    
    # Vendor-specific products endpoint (with vendor_id parameter)
    path('products/vendor/', VendorProductsAPI.as_view(), name='vendor-products'),
    
    # Other vendor endpoints
    path('dashboard/', VendorDashboardAPI.as_view(), name='vendor-dashboard-api'),
    path('profile/', VendorProfileAPI.as_view(), name='vendor-profile-api'),
    path('register/', VendorRegistrationAPI.as_view(), name='vendor-registration-api'),
    
    # Regular vendor views
    path('product/add/', views.add_product, name='add_product'),
    path('product/edit/<int:pk>/', views.edit_product, name='edit_product'),
    path('product/delete/<int:pk>/', views.delete_product, name='delete_product'),
]
