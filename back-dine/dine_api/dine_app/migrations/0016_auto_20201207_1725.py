# Generated by Django 2.2 on 2020-12-07 17:25

import datetime
import django.contrib.postgres.fields
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dine_app', '0015_auto_20201207_1715'),
    ]

    operations = [
        migrations.CreateModel(
            name='Orders_Dine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foods_id', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.jsonb.JSONField(), default=True, size=None)),
                ('payment', models.BooleanField(default=True)),
                ('take_away', models.BooleanField(default=True)),
                ('money_amout', models.DecimalField(decimal_places=2, max_digits=8)),
                ('order_time', models.DateTimeField(blank=True, default=datetime.datetime.now)),
                ('order_aproximate_time', models.DateTimeField()),
                ('accepted', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='clients_dine',
            name='email',
            field=models.CharField(max_length=50),
        ),
        migrations.DeleteModel(
            name='Orders',
        ),
        migrations.AddField(
            model_name='orders_dine',
            name='cli_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dine_app.Clients_Dine'),
        ),
        migrations.AddField(
            model_name='orders_dine',
            name='res_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='dine_app.Restaurants'),
        ),
    ]