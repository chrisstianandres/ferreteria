# Generated by Django 3.1.5 on 2021-06-09 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresa', '0002_empresa_tasa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empresa',
            name='facebook',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='empresa',
            name='instagram',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='empresa',
            name='twitter',
            field=models.CharField(blank=True, max_length=25, null=True),
        ),
    ]
