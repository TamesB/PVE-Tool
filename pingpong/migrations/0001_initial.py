# Generated by Django 3.1.7 on 2021-03-02 12:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import pingpong.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pve', '0002_auto_20210302_1355'),
        ('project', '0002_auto_20210302_0231'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentPhase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(blank=True, default=1, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CommentStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='PVEItemStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aanvulling', models.TextField(default=None, max_length=1000, null=True)),
                ('datum', models.DateTimeField(auto_now=True)),
                ('kostenConsequenties', models.DecimalField(blank=True, decimal_places=2, default=None, max_digits=10, null=True)),
                ('bijlage', models.FileField(blank=True, null=True, upload_to=pingpong.models.PVEItemStatus.get_upload_path)),
                ('init_accepted', models.BooleanField(blank=True, default=False, null=True)),
                ('gebruiker', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('item', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='pve.pveitem')),
                ('project', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='project.project')),
                ('status', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='pingpong.commentstatus')),
            ],
        ),
        migrations.CreateModel(
            name='CommentReply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(default=None, max_length=1000, null=True)),
                ('accept', models.BooleanField(blank=True, default=False, null=True)),
                ('kostenConsequenties', models.DecimalField(blank=True, decimal_places=2, default=None, max_digits=10, null=True)),
                ('datum', models.DateTimeField(auto_now=True)),
                ('bijlage', models.FileField(blank=True, null=True, upload_to=pingpong.models.CommentReply.get_upload_path)),
                ('commentphase', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pingpong.commentphase')),
                ('gebruiker', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('onItem', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pingpong.pveitemstatus')),
                ('status', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='pingpong.commentstatus')),
            ],
        ),
        migrations.AddField(
            model_name='commentphase',
            name='accepted_items',
            field=models.ManyToManyField(related_name='accepted_items', to='pingpong.PVEItemStatus'),
        ),
        migrations.AddField(
            model_name='commentphase',
            name='changed_items',
            field=models.ManyToManyField(to='pingpong.PVEItemStatus'),
        ),
        migrations.AddField(
            model_name='commentphase',
            name='project',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='project.project'),
        ),
        migrations.AddField(
            model_name='commentphase',
            name='todo_items',
            field=models.ManyToManyField(related_name='todo_items', to='pingpong.PVEItemStatus'),
        ),
    ]