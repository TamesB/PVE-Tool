from rest_framework import routers
from .api import PVEViewSet

router = routers.DefaultRouter()
router.register('api/pve', PVEViewSet, 'pve')

urlpatterns = router.urls
