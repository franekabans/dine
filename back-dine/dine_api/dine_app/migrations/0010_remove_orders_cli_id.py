# Generated by Django 2.2 on 2020-12-07 16:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dine_app', '0009_auto_20201207_1638'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='cli_id',
        ),
    ]
