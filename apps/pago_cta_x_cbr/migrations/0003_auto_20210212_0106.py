# Generated by Django 3.1.5 on 2021-02-12 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pago_cta_x_cbr', '0002_auto_20210212_0100'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pago_cta_x_cobrar',
            name='fecha_pago',
            field=models.DateField(default=None),
        ),
    ]