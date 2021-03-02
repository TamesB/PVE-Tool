from rest_framework import serializers
from pve.models import PVEItem

# Lead Serializer
class PVEItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PVEItem
        fields = '__all__'