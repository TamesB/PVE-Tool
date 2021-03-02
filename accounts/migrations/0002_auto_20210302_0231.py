# Generated by Django 3.1.7 on 2021-03-02 01:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('project', '0002_auto_20210302_0231'),
        ('auth', '0012_alter_user_first_name_max_length'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='organisatie',
            name='projecten',
            field=models.ManyToManyField(default=None, related_name='projecten', to='project.Project'),
        ),
        migrations.AddField(
            model_name='invitation',
            name='inviter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='invitation',
            name='organisatie',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.organisatie'),
        ),
        migrations.AddField(
            model_name='invitation',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='project.project'),
        ),
        migrations.AddField(
            model_name='forgotpassinvite',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='customuser',
            name='belegger',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.belegger'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='organisatie',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.organisatie'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]