from django.db import models
from django.conf import settings
from accounts.models import Belegger, CustomUser

class PVEVersie(models.Model):
    belegger = models.ForeignKey(Belegger, on_delete=models.CASCADE)
    versie = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.belegger}: {self.versie}"    

class Bouwsoort(models.Model):
    versie = models.ForeignKey(PVEVersie, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=256)

    def __str__(self):
        return self.parameter

class TypeObject(models.Model):
    versie = models.ForeignKey(PVEVersie, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=256)

    def __str__(self):
        return self.parameter

class Doelgroep(models.Model):
    versie = models.ForeignKey(PVEVersie, on_delete=models.CASCADE)
    parameter = models.CharField(max_length=256)

    def __str__(self):
        return self.parameter    

class PVEHoofdstuk(models.Model):
    versie = models.ForeignKey(PVEVersie, on_delete=models.CASCADE)
    hoofdstuk = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return f"{self.hoofdstuk}"

class PVEParagraaf(models.Model):
    versie = models.ForeignKey(PVEVersie, on_delete=models.CASCADE)
    hoofdstuk = models.ForeignKey(
                        PVEHoofdstuk, on_delete=models.CASCADE, default=1
                        )
    paragraaf = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        if self.paragraaf:
            return f"{self.paragraaf}"
        else:
            return f"{self.hoofdstuk.hoofdstuk}"


class PVEItem(models.Model):
    versie = models.ForeignKey(PVEVersie, on_delete=models.CASCADE)

    hoofdstuk = models.ForeignKey(PVEHoofdstuk, on_delete=models.CASCADE, default=1)
    paragraaf = models.ForeignKey(PVEParagraaf, on_delete=models.CASCADE, blank=True, null=True)
    inhoud = models.TextField(max_length=5000)

    # behoort tot welke projecten
    projects = models.ManyToManyField('project.Project', blank=True)

    basisregel = models.BooleanField(default=False)
    Bouwsoort = models.ManyToManyField(Bouwsoort, blank=True)
    TypeObject = models.ManyToManyField(TypeObject, blank=True)
    Doelgroep = models.ManyToManyField(Doelgroep, blank=True)

    Smarthome = models.BooleanField(default=False)
    AED = models.BooleanField(default=False)
    EntreeUpgrade = models.BooleanField(default=False)
    Pakketdient = models.BooleanField(default=False)
    JamesConcept = models.BooleanField(default=False)

    # Upload bijlages naar mediaroot/belegger/versie/BasisBijlages/filename
    def get_upload_path(instance, filename):
        return '{0}/uploads/{1}/PvE-{2}/BasisBijlages/{3}'.format(settings.MEDIA_ROOT, versie.belegger, versie.versie, filename)

    bijlage = models.FileField(blank=True, null=True, upload_to=get_upload_path)

    def __str__(self):
        return f"{self.inhoud}"