from .models import PVEItem, PVEHoofdstuk, PVEParagraaf
from .filters import PVEItemFilter, PVEHoofdstukFilter, PVEParagraafFilter
from .serializers import PVEItemSerializer, PVEHoofdstukSerializer, PVEParagraafSerializer

from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework import generics
from rest_framework.response import Response
from django_filters import rest_framework as filters

# GET PVE itembook, with filtering based on chapter/paragraph
class PVEItemViewSet(viewsets.ModelViewSet):
    queryset = PVEItem.objects.select_related("hoofdstuk").select_related("paragraaf").select_related("versie").all().order_by('id')
    serializer_class = PVEItemSerializer
    #permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = PVEItemFilter

    def perform_create(self, serializer):
        serializer.save()

class PVEHoofdstukViewSet(viewsets.ModelViewSet):
    queryset = PVEHoofdstuk.objects.all().order_by('id')
    serializer_class = PVEHoofdstukSerializer
    #permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = PVEHoofdstukFilter

    def perform_create(self, serializer):
        serializer.save()

class PVEParagraafViewSet(viewsets.ModelViewSet):
    queryset = PVEParagraaf.objects.all().order_by('id')
    serializer_class = PVEParagraafSerializer
    #permission_classes = [permissions.IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser]
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = PVEParagraafFilter

    def perform_create(self, serializer):
        serializer.save()
