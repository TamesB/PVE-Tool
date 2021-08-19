from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import PVEItemViewSet, PVEHoofdstukViewSet, PVEParagraafViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'api/pveitems', PVEItemViewSet)
router.register(r'api/pvehfst', PVEHoofdstukViewSet)
router.register(r'api/pveprgrf', PVEParagraafViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]