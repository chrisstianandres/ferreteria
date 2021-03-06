# Generated by Django 3.1.5 on 2021-02-06 19:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('producto_base', '0001_initial'),
        ('presentacion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pvp', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=9, null=True)),
                ('pcp', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=9, null=True)),
                ('stock', models.IntegerField(default=0)),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='producto/imagen')),
                ('presentacion', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='presentacion.presentacion')),
                ('producto_base', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='producto_base.producto_base')),
            ],
            options={
                'verbose_name': 'producto',
                'verbose_name_plural': 'productos',
                'db_table': 'producto',
                'ordering': ['-id'],
            },
        ),
    ]
