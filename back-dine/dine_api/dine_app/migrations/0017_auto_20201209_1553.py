# Generated by Django 2.2 on 2020-12-09 15:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dine_app', '0016_auto_20201207_1725'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='owner',
            name='id',
        ),
        migrations.AddField(
            model_name='owner',
            name='user',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
