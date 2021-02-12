from datetime import datetime

from django.db import models
from django.forms import model_to_dict

from apps.venta.models import Venta

ESTADO = (
    (0, 'PENDIENTE'),
    (1, 'PAGADA')
)


class Cta_x_cobrar(models.Model):
    fecha = models.DateField(default=datetime.now)
    venta = models.ForeignKey(Venta, on_delete=models.PROTECT)
    valor = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    interes = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    tolal_deuda = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    saldo = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    nro_cuotas = models.IntegerField(default=1)
    estado = models.IntegerField(choices=ESTADO, default=0)

    def __str__(self):
        return '{} {}'.format(self.fecha, self.venta)

    def toJSON(self):
        item = model_to_dict(self)
        item['venta'] = self.venta.toJSON()
        item['nro_cuotas'] = '{} {}'.format(self.nro_cuotas, 'MESES')
        item['estado_text'] = '{}'.format(self.get_estado_display())
        return item

    class Meta:
        db_table = 'ctas_cobrar'
        verbose_name = 'ctas_cobrar'
        verbose_name_plural = 'ctas_cobrar'
