from rest_framework import serializers
from pve.models import PVEItem, PVEHoofdstuk, PVEParagraaf

# Lead Serializer    
class PVEItemSerializer(serializers.ModelSerializer):        
    class Meta:
        model = PVEItem
        fields = ['id', 'versie', 'hoofdstuk', 'paragraaf', 'inhoud', 'bijlage']

# Lead Serializer    
class PVEHoofdstukSerializer(serializers.ModelSerializer):        
    class Meta:
        model = PVEHoofdstuk
        fields = ['id', 'versie', 'hoofdstuk']

# Lead Serializer    
class PVEParagraafSerializer(serializers.ModelSerializer):        
    class Meta:
        model = PVEParagraaf
        fields = ['id', 'versie', 'hoofdstuk', 'paragraaf']