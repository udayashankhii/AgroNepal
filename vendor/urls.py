from django.urls import path
from . import views
from .views import ProductList
from .views import VendorDashboardAPI
from .views import VendorProfileAPI
from .views import VendorProductsAPI

app_name = 'vendor'

urlpatterns = [
    path('dashboard/', views.vendor_dashboard, name='dashboard'),
    path('register/', views.vendor_registration, name='registration'),
    path('product/add/', views.add_product, name='add_product'),
    path('product/edit/<int:pk>/', views.edit_product, name='edit_product'),
    path('product/delete/<int:pk>/', views.delete_product, name='delete_product'),
    path('api/products/', ProductList.as_view(), name='product-list'),
    path('api/dashboard/', VendorDashboardAPI.as_view(), name='vendor-dashboard-api'),
    path('api/profile/', VendorProfileAPI.as_view(), name='vendor-profile-api'),
    path('api/products/', VendorProductsAPI.as_view(), name='vendor-products-api'),
]

