from datetime import datetime
from django.db import models
from django.forms import model_to_dict

from apps.user.models import User
from ferreteria.settings import BASE_DIR


class DatabaseBackups(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    archive = models.FileField()
    fecha = models.DateField(default=datetime.now)

    def __str__(self):
        return '%s' % self.fecha


    def toJSON(self):
        item = model_to_dict(self)
        item['archive'] = self.archive.name
        item['archive_path'] = self.archive.url
        item['fecha'] = self.fecha.strftime('%Y-%m-%d')
        return item

    class Meta:
        db_table = 'respaldo_datos'
        verbose_name = 'databasebackups'
        ordering = ['-id']