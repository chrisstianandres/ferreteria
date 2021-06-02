from django.db import models
from django.forms import model_to_dict


# Create your models here.
class cargo(models.Model):
    nombre = models.CharField(max_length=50)
    sueldo = models.DecimalField(default=0.000, max_digits=9, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return '%s' % (self.nombre)

    def toJSON(self):
        item = model_to_dict(self)
        return item

    class Meta:
        db_table = 'cargo'
        verbose_name = 'cargo'
        verbose_name_plural = 'cargos'
        ordering = ['-nombre']
