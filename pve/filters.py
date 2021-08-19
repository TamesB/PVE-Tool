from django_filters import rest_framework as filters
from .models import PVEItem, PVEHoofdstuk, PVEParagraaf

class PVEItemFilter(filters.FilterSet):
    class Meta:
        model = PVEItem
        fields = ['versie', 'hoofdstuk', 'paragraaf']

class PVEHoofdstukFilter(filters.FilterSet):
    class Meta:
        model = PVEHoofdstuk
        fields = ['versie']

class PVEParagraafFilter(filters.FilterSet):
    class Meta:
        model = PVEParagraaf
        fields = ['versie', 'hoofdstuk']
