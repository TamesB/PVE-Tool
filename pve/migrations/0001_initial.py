# Generated by Django 3.1.7 on 2021-03-02 01:31

from django.db import migrations, models
import django.db.models.deletion
import pve.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('project', '0001_initial'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bouwsoort',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parameter', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Doelgroep',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parameter', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='PVEHoofdstuk',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hoofdstuk', models.CharField(blank=True, max_length=256, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PVEVersie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('versie', models.CharField(blank=True, max_length=50, null=True)),
                ('belegger', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.belegger')),
            ],
        ),
        migrations.CreateModel(
            name='TypeObject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parameter', models.CharField(max_length=256)),
                ('versie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pve.pveversie')),
            ],
        ),
        migrations.CreateModel(
            name='PVEParagraaf',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paragraaf', models.CharField(blank=True, max_length=256, null=True)),
                ('hoofdstuk', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='pve.pvehoofdstuk')),
                ('versie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pve.pveversie')),
            ],
        ),
        migrations.CreateModel(
            name='PVEItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inhoud', models.TextField(max_length=5000)),
                ('basisregel', models.BooleanField(default=False)),
                ('Smarthome', models.BooleanField(default=False)),
                ('AED', models.BooleanField(default=False)),
                ('EntreeUpgrade', models.BooleanField(default=False)),
                ('Pakketdient', models.BooleanField(default=False)),
                ('JamesConcept', models.BooleanField(default=False)),
                ('bijlage', models.FileField(blank=True, null=True, upload_to=pve.models.get_upload_path)),
                ('Bouwsoort', models.ManyToManyField(blank=True, to='pve.Bouwsoort')),
                ('Doelgroep', models.ManyToManyField(blank=True, to='pve.Doelgroep')),
                ('TypeObject', models.ManyToManyField(blank=True, to='pve.TypeObject')),
                ('hoofdstuk', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='pve.pvehoofdstuk')),
                ('paragraaf', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pve.pveparagraaf')),
                ('projects', models.ManyToManyField(blank=True, to='project.Project')),
                ('versie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pve.pveversie')),
            ],
        ),
        migrations.AddField(
            model_name='pvehoofdstuk',
            name='versie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pve.pveversie'),
        ),
        migrations.AddField(
            model_name='doelgroep',
            name='versie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pve.pveversie'),
        ),
        migrations.AddField(
            model_name='bouwsoort',
            name='versie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pve.pveversie'),
        ),
    ]
