# Generated by Django 3.1.5 on 2021-02-06 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tipo_gasto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'tipo_gasto',
                'verbose_name_plural': 'tipo_gastos',
                'db_table': 'tipo_gasto',
                'ordering': ['-id', '-nombre'],
            },
        ),
    ]
