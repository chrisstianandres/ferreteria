# Generated by Django 3.1.5 on 2021-02-11 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('empresa', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='empresa',
            name='tasa',
            field=models.IntegerField(blank=True, default=16, null=True),
        ),
    ]
