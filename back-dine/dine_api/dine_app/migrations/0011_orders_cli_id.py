# Generated by Django 2.2 on 2020-12-07 16:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dine_app', '0010_remove_orders_cli_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='cli_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='dine_app.Clients_Dine'),
        ),
    ]
