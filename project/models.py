from django.db import models
from django.conf import settings
from django.contrib.gis.db import models
from accounts.models import Belegger

class ContractStatus(models.Model):
    contrstatus = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.contrstatus}"

# Create your models here.
class Project(models.Model):
    belegger = models.ForeignKey(Belegger, on_delete=models.CASCADE, null=True)

    nummer = models.FloatField(max_length=100, default=None)
    naam = models.CharField(max_length=500, default=None)
    plaats = models.PointField()
    plaatsnamen = models.CharField(max_length=250, default=None, blank=True, null=True)
    vhe = models.FloatField(max_length=100, default=None)
    pensioenfonds = models.CharField(max_length=100, default=None, blank=True, null=True)
    statuscontract = models.ForeignKey(ContractStatus, on_delete=models.CASCADE, blank=True, null=True)
    datum_aangemaakt = models.DateTimeField(auto_now_add=True)

    datum_recent_verandering = models.DateTimeField('recente_verandering', auto_now=True)

    organisaties = models.ManyToManyField('accounts.Organisatie', default=None, related_name="organisatie_projecten", blank=True)
    projectmanager = models.ForeignKey('accounts.CustomUser', default=None, related_name="projectmanager", on_delete=models.CASCADE, blank=True, null=True)
    permitted = models.ManyToManyField('accounts.CustomUser', default=None, related_name="permitted_projecten")
    pveconnected = models.BooleanField(blank=True, null=True, default=False)

    # frozen level 0: all derde kunnen +opmerking doen. Frozen level 1: alleen aangegeven derde door projectmanager kan
    # de statussen accepteren of een opmerking maken. De volgende even frozens zijn dan projectmanager behandelbaar,
    # en de oneven is behandelbaar door de derde. Zo trechteren alle regels naar uiteindelijke acceptatie van alle
    # statussen. Opmerkingen moeten wellicht bijgehouden worden. MOET NOG MIGRATEN
    frozenLevel = models.IntegerField(default=0, null=True)
    fullyFrozen = models.BooleanField(default=False)

    bouwsoort1 = models.ForeignKey('pve.Bouwsoort', on_delete=models.CASCADE, blank=True, null=True)
    typeObject1 = models.ForeignKey('pve.TypeObject', on_delete=models.CASCADE, blank=True, null=True)
    doelgroep1 = models.ForeignKey('pve.Doelgroep', on_delete=models.CASCADE, blank=True, null=True)
    bouwsoort2 = models.ForeignKey('pve.Bouwsoort', on_delete=models.CASCADE, blank=True, null=True, related_name='subbouwsoort_project')
    typeObject2 = models.ForeignKey('pve.TypeObject', on_delete=models.CASCADE, blank=True, null=True, related_name='subtypeobject_project')
    doelgroep2 = models.ForeignKey('pve.Doelgroep', on_delete=models.CASCADE, blank=True, null=True, related_name='subdoelgroep_project')
    bouwsoort3 = models.ForeignKey('pve.Bouwsoort', on_delete=models.CASCADE, blank=True, null=True, related_name='subsubbouwsoort_project')
    typeObject3 = models.ForeignKey('pve.TypeObject', on_delete=models.CASCADE, blank=True, null=True, related_name='subsubtypeobject_project')
    doelgroep3 = models.ForeignKey('pve.Doelgroep', on_delete=models.CASCADE, blank=True, null=True, related_name='subsubdoelgroep_project')

    Smarthome = models.BooleanField(default=False)
    AED = models.BooleanField(default=False)
    EntreeUpgrade = models.BooleanField(default=False)
    Pakketdient = models.BooleanField(default=False)
    JamesConcept = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.naam}"