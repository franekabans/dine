# Generated by Django 2.2 on 2020-12-07 17:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dine_app', '0011_orders_cli_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orders',
            name='cli_id',
        ),
    ]
