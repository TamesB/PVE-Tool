from django_filters import rest_framework as filters
from .models import PVEItem

class PVEItemFilter(filters.FilterSet):
    class Meta:
        model = PVEItem
        fields = ['versie', 'hoofdstuk', 'paragraaf']
