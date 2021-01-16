from django.db import models
from django.forms import model_to_dict

from apps.presentacion.models import Presentacion
from apps.producto_base.models import Producto_base
from ferreteria.settings import STATIC_URL, MEDIA_URL


class Producto(models.Model):
    producto_base = models.ForeignKey(Producto_base, on_delete=models.PROTECT)
    presentacion = models.ForeignKey(Presentacion, on_delete=models.PROTECT)
    pvp = models.DecimalField(default=0.00, max_digits=9, decimal_places=2, null=True, blank=True)
    pcp = models.DecimalField(default=0.00, max_digits=9, decimal_places=2, null=True, blank=True)
    imagen = models.ImageField(upload_to='producto/imagen', blank=True, null=True)

    def __str__(self):
        return '%s' % self.producto_base.nombre

    def toJSON(self):
        item = model_to_dict(self)
        item['producto_base'] = self.producto_base.toJSON()
        item['presentacion'] = self.presentacion.toJSON()
        item['pvp'] = format(self.pvp, '.2f')
        item['pcp'] = format(self.pcp, '.2f')
        item['imagen'] = self.get_image()
        item['name_imagen'] = self.name_image()
        item['check'] = self.check_image()
        return item

    def get_image(self):
        if self.imagen:
            return '{}{}'.format(MEDIA_URL, self.imagen)
        return '{}{}'.format(MEDIA_URL, 'producto/no_imagen.jpg')

    def name_image(self):
        if self.imagen:
            return '{}'.format(self.imagen)
        return '{}{}'.format(MEDIA_URL, 'producto/no_imagen.jpg')

    def check_image(self):
        if self.imagen:
            return 1
        return 0


    class Meta:
        db_table = 'producto'
        verbose_name = 'producto'
        verbose_name_plural = 'productos'
        ordering = ['-id']