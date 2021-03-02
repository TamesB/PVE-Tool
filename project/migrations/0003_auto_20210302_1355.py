# Generated by Django 3.1.7 on 2021-03-02 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210302_0231'),
        ('project', '0002_auto_20210302_0231'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='organisaties',
            field=models.ManyToManyField(blank=True, default=None, related_name='organisatie_projecten', to='accounts.Organisatie'),
        ),
    ]