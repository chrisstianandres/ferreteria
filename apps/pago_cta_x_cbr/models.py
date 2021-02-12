from datetime import datetime

from django.db import models
from django.forms import model_to_dict

from apps.cta_x_cbr.models import Cta_x_cobrar
from apps.venta.models import Venta
from apps.user.models import User
ESTADO = (
    (0, 'POR VENCER'),
    (1, 'VENCIDA'),
    (2, 'PAGADA')
)


class Pago_cta_x_cobrar(models.Model):
    fecha = models.DateField(default=datetime.now)
    fecha_pago = models.DateField(default=None, null=True, blank=True)
    cta_cobrar = models.ForeignKey(Cta_x_cobrar, on_delete=models.PROTECT)
    valor = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    estado = models.IntegerField(choices=ESTADO, default=0)

    def __str__(self):
        return '{} {}'.format(self.fecha, self.cta_cobrar)

    def toJSON(self):
        item = model_to_dict(self)
        item['cta_cobrar'] = self.cta_cobrar.toJSON()
        return item

    class Meta:
        db_table = 'pago_ctas_cobrar'
        verbose_name = 'pago_ctas_cobrar'
