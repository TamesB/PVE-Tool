from pve.models import PVEItem
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, JSONParser
from .serializers import PVEItemSerializer

# Lead Viewset
class PVEViewSet(viewsets.ModelViewSet):
    queryset = PVEItem.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = PVEItemSerializer
    parser_classes = (MultiPartParser, JSONParser)

    def get_queryset(self):
        versie_id = self.kwargs['versie_id']

        return queryset.filter(versie__id=versie_id)

    def perform_create(self, serializer):
        serializer.save()