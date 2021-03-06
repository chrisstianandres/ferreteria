# Generated by Django 3.1.4 on 2020-12-05 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='cargo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('sueldo', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=9, null=True)),
            ],
            options={
                'verbose_name': 'cargo',
                'verbose_name_plural': 'cargos',
                'db_table': 'cargo',
                'ordering': ['-nombre'],
            },
        ),
    ]
