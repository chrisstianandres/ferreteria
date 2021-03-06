import json
import os
from datetime import datetime
import decimal

from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *

from apps.backEnd import nombre_empresa, verificar
from apps.cliente.forms import ClienteForm
from apps.cliente.models import Cliente
from apps.cta_x_cbr.models import Cta_x_cobrar
from apps.mixins import ValidatePermissionRequiredMixin
from apps.pago_cta_x_cbr.models import Pago_cta_x_cobrar
from apps.ubicacion.models import *
from apps.user.models import User

opc_icono = 'fas fa-search-dollar'
opc_entidad = 'Cuentas por Cobrar'
crud = '/ctas_cobrar/nuevo'
empresa = nombre_empresa()
year = [{'id': y, 'year': (datetime.now().year) - y} for y in range(0, 5)]
cliente = [{'id': p.id, 'nombre': p.get_full_name} for p in User.objects.filter(tipo=0)]


class lista(ValidatePermissionRequiredMixin, ListView):
    model = Cta_x_cobrar
    template_name = "front-end/ctas_cobrar/list.html"
    permission_required = 'ctas_cobrar.ctas_cobrar'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}

        try:
            action = request.POST['action']
            if action == 'list':
                data = []
                for c in self.model.objects.all():
                    data.append(c.toJSON())
            elif action == 'detalle':
                id = request.POST['id']
                if id:
                    data = []
                    result = Pago_cta_x_cobrar.objects.filter(cta_cobrar_id=id)
                    for p in result:
                        data.append(p.toJSON())
            elif action == 'check':
                data = []
                result = Pago_cta_x_cobrar.objects.filter(fecha__lt=datetime.now(), estado=0)
                for p in result:
                    p.estado = 1
                    p.save()
                data = 1
            elif action == 'pagar':
                data = []
                id = request.POST['id']
                result = Pago_cta_x_cobrar.objects.get(id=id)
                result.estado = 2
                result.valor_pagado = result.valor_pagado + result.saldo
                result.fecha_pago = datetime.now()
                cta = Cta_x_cobrar.objects.get(id=result.cta_cobrar_id)
                cta.saldo = float(cta.saldo) - float(result.saldo)
                result.saldo = 0.00
                if cta.saldo <= 0:
                    cta.estado = 1
                cta.save()
                result.save()

        except Exception as e:
            data['error'] = str(e)
            print(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Guardar'
        data['titulo'] = 'Listado de Cuentas por Cobrar'
        data['titulo_lista'] = 'Listado de Cuentas por Cobrar'
        data['empresa'] = empresa
        return data


class pagar(ValidatePermissionRequiredMixin, ListView):
    model = Pago_cta_x_cobrar
    template_name = 'front-end/ctas_cobrar/pagar.html'
    permission_required = 'ctas_cobrar.view_ctas_cobrar'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'pagar':
                data = []
                for c in self.model.objects.filter(cta_cobrar_id=self.kwargs['pk']):
                    print(c)
            elif action == 'letras':
                data = []
                for c in self.model.objects.filter(cta_cobrar_id=self.kwargs['pk']):
                    data.append(c.toJSON())
            elif action == 'cuenta':
                data = []
                cta = Cta_x_cobrar.objects.get(id=self.kwargs['pk'])
                data.append(float(cta.saldo))
            elif action == 'abono':
                data = []
                datos = json.loads(request.POST['abono'])
                abono = datos['abono']
                cta = Cta_x_cobrar.objects.get(id=self.kwargs['pk'])
                cta.saldo = float(cta.saldo) - float(abono)
                if cta.saldo == 0:
                    cta.estado = 1
                cta.save()
                x = 1
                for c in self.model.objects.filter(cta_cobrar_id=self.kwargs['pk']).filter(Q(estado=0) | Q(estado=1)):
                    if abono <= 0:
                        break
                    else:
                        if float(abono) <= float(c.saldo):
                            c.saldo = float(c.saldo) - float(abono)
                            c.valor_pagado = float(c.valor_pagado) + float(abono)
                            c.fecha_pago = datetime.now()
                            abono = 0
                            if c.saldo == 0:
                                c.estado = 2
                            c.save()
                        else:
                            saldo = c.saldo
                            abono = decimal.Decimal(repr(abono))
                            cal = abono - saldo
                            pago = abono - cal
                            saldo -= pago
                            c.valor_pagado = pago
                            c.saldo = saldo
                            if c.saldo <= 0:
                                c.estado = 2
                                c.fecha_pago = datetime.now()
                            c.save()
                            abono = float(cal)
                            x += 1
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Guardar'
        data['titulo'] = 'Cuenta por cobrar'
        data['titulo_lista'] = 'Letras de credito'
        saldo = Cta_x_cobrar.objects.get(id=self.kwargs['pk'])
        data['saldo'] = format(saldo.saldo, '.2f')
        data['empresa'] = empresa
        return data


class CrudView(ValidatePermissionRequiredMixin, TemplateView):
    form_class = ClienteForm
    template_name = 'front-end/cliente/form.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            if action == 'add':
                f = ClienteForm(request.POST)
                data = self.save_data(f)
            elif action == 'edit':
                pk = request.POST['id']
                cliente = Cliente.objects.get(pk=int(pk))
                f = ClienteForm(request.POST, instance=cliente)
                data = self.save_data(f)
            elif action == 'delete':
                pk = request.POST['id']
                cli = Cliente.objects.get(pk=pk)
                cli.delete()
                data['resp'] = True
            else:
                data['error'] = 'No ha seleccionado ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def save_data(self, f):
        data = {}
        if f.is_valid():
            f.save(commit=False)
            if verificar(f.data['cedula']):
                cli = f.save()
                data['resp'] = True
                data['cliente'] = cli.toJSON()
            else:
                f.add_error("cedula", "Numero de Cedula no valido para Ecuador")
                data['error'] = f.errors
        else:
            data['error'] = f.errors
        return data


class report(ValidatePermissionRequiredMixin, ListView):
    model = Pago_cta_x_cobrar
    template_name = 'front-end/pago/report.html'
    permission_required = 'view_reportes'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return Cta_x_cobrar.objects.none()

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            start_date = request.POST.get('start_date', '')
            end_date = request.POST.get('end_date', '')
            action = request.POST['action']
            print(action)
            print(start_date)
            print(end_date)
            if action == 'report':
                data = []
                if start_date == '' and end_date == '':
                    query = Pago_cta_x_cobrar.objects.all().select_related('cta_cobrar')
                else:
                    query = Pago_cta_x_cobrar.objects.filter(cta_cobrar__venta__fecha__range=[start_date, end_date]).select_related('cta_cobrar')
            else:
                id = request.POST.get('id', '')
                data = []
                query = Pago_cta_x_cobrar.objects.filter(cta_cobrar__venta__cliente_id=id).select_related('cta_cobrar')
            for p in query:
                data.append(p.toJSON())
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


def ciudad(request):
    data = {}
    with open('D:/PycharmProjects/ferreteria/apps/ciudades.json', encoding="utf8") as f:
        data = json.load(f)
        for c in data:
            pro = Provincia()
            pro.nombre = str(data[c]['provincia'])
            pro.save()
            for x in data[c]['cantones']:
                can = Canton()
                can.provincia_id = pro.id
                can.nombre = str(data[c]['cantones'][x]['canton'])
                can.save()
                for p in data[c]['cantones'][x]['parroquias']:
                    par = Parroquia()
                    par.canton_id = can.id
                    par.nombre = str(data[c]['cantones'][x]['parroquias'][p])
                    par.save()
        data = Parroquia.objects.all()
    return HttpResponse(data)
