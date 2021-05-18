# Create your views here.

from datetime import datetime

from django.db.models import Sum
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *

from apps.backEnd import nombre_empresa
from apps.empresa.models import Empresa
from apps.mixins import ValidatePermissionRequiredMixin
from apps.pago_cta_x_cbr.models import Pago_cta_x_cobrar
from apps.producto.models import Producto
from apps.user.models import User
from apps.venta.models import Venta, Detalle_venta

opc_icono = 'fas fa-search-dollar'
opc_entidad = 'Cuentas por cobrar'
empresa = nombre_empresa()
year = [{'id': y, 'year': (datetime.now().year) - y} for y in range(0, 5)]
cliente = [{'id': p.id, 'nombre': p.get_full_name} for p in User.objects.filter(tipo=0)]


class report(ValidatePermissionRequiredMixin, ListView):
    model = Pago_cta_x_cobrar
    template_name = 'front-end/pago/report.html'
    permission_required = 'venta.view_venta'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return Venta.objects.none()

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            start_date = request.POST.get('start_date', '')
            end_date = request.POST.get('end_date', '')
            empresa = Empresa.objects.first()
            iva = float(empresa.iva / 100)
            action = request.POST['action']
            if action == 'report':
                data = []
                if start_date == '' and end_date == '':
                    query = Detalle_venta.objects.values('venta__fecha', 'producto_id', 'pvp_actual',
                                                         'venta__cliente_id').order_by().annotate(
                        Sum('cantidad')).filter(venta__estado=1)
                else:
                    query = Detalle_venta.objects.values('venta__fecha', 'producto_id', 'pvp_actual',
                                                         'venta__cliente_id') \
                        .filter(venta__fecha__range=[start_date, end_date], venta__estado=1).order_by().annotate(
                        Sum('cantidad'))
                for p in query:
                    total = p['pvp_actual'] * p['cantidad__sum']
                    pr = Producto.objects.get(id=int(p['producto_id']))
                    cli = User.objects.get(id=int(p['venta__cliente_id']))
                    data.append([
                        p['venta__fecha'].strftime("%d/%m/%Y"),
                        cli.get_full_name(),
                        pr.producto_base.nombre,
                        int(p['cantidad__sum']),
                        format(p['pvp_actual'], '.2f'),
                        format(total, '.2f'),
                        format((float(total) * iva), '.2f'),
                        format(((float(total) * iva) + float(total)), '.2f')
                    ])
            elif action == 'producto':
                id = request.POST.get('id', '')
                data = []
                query = Detalle_venta.objects.values('venta__fecha', 'producto_id', 'pvp_actual',
                                                     'venta__cliente_id').order_by().annotate(
                    Sum('cantidad')).filter(venta__estado=1, producto_id=id)

                for p in query:
                    total = p['pvp_actual'] * p['cantidad__sum']
                    pr = Producto.objects.get(id=int(p['producto_id']))
                    cli = User.objects.get(id=int(p['venta__cliente_id']))
                    data.append([
                        p['venta__fecha'].strftime("%d/%m/%Y"),
                        cli.get_full_name(),
                        pr.producto_base.nombre,
                        int(p['cantidad__sum']),
                        format(p['pvp_actual'], '.2f'),
                        format(total, '.2f'),
                        format((float(total) * iva), '.2f'),
                        format(((float(total) * iva) + float(total)), '.2f')
                    ])
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            print(e)
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['titulo'] = 'Reporte de Cuentas por cobrar'
        data['empresa'] = empresa
        data['titulo_lista'] = 'Cuentas por cobrar'
        data['year'] = year
        data['cliente'] = cliente
        return data


