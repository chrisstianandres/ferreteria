import datetime as dt
import json
import locale
import os
from datetime import datetime

from dateutil.relativedelta import relativedelta
from django.conf import settings
from django.contrib.staticfiles import finders
from django.db import transaction
from django.db.models import Sum, Count, Q
from django.db.models.functions import Coalesce
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template.loader import get_template
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *
from xhtml2pdf import pisa

from apps.backEnd import nombre_empresa
from apps.cliente.forms import ClienteForm
from apps.cliente.models import Cliente
from apps.compra.models import Compra
from apps.cta_x_cbr.forms import Cta_cobrarForm
from apps.cta_x_cbr.models import Cta_x_cobrar
from apps.delvoluciones_venta.models import Devolucion
from apps.empresa.models import Empresa
from apps.mixins import ValidatePermissionRequiredMixin
from apps.pago_cta_x_cbr.models import Pago_cta_x_cobrar
from apps.producto.models import Producto
from apps.user.forms import UserForm
from apps.user.models import User
from apps.venta.forms import Detalle_VentaForm, VentaForm
from apps.venta.models import Venta, Detalle_venta

opc_icono = 'fa fa-shopping-basket '
opc_entidad = 'Ventas'
crud = '/venta/crear'
empresa = nombre_empresa()
year = [{'id': y, 'year': (datetime.now().year) - y} for y in range(0, 5)]
producto = [{'id': p.id, 'nombre': p.producto_base.nombre} for p in Producto.objects.all()]


class lista(ValidatePermissionRequiredMixin, ListView):
    model = Venta
    template_name = 'front-end/venta/list.html'
    permission_required = 'venta.view_venta'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'list':
                data = []
                if request.user.tipo == 1:
                    query = Venta.objects.all().select_related('cliente')
                else:
                    query = Venta.objects.filter(cliente_id=request.user.id).select_related('cliente')
                for c in query:
                    data.append(c.toJSON())
            elif action == 'detalle':
                id = request.POST['id']
                if id:
                    data = []
                    result = Detalle_venta.objects.filter(venta_id=id).select_related('venta').select_related('producto')
                    for p in result:
                        data.append({
                            'producto': p.producto.producto_base.nombre,
                            'categoria': p.producto.producto_base.categoria.nombre,
                            'presentacion': p.producto.presentacion.nombre,
                            'cantidad': p.cantidad,
                            'pvp': p.pvp_actual,
                            'subtotal': p.subtotal
                        })
            elif action == 'estado':
                id = request.POST['id']
                if id:
                    with transaction.atomic():
                        es = Venta.objects.get(id=id)
                        es.estado = 0
                        dev = Devolucion()
                        dev.venta_id = id
                        dev.fecha = datetime.now()
                        dev.save()
                        for i in Detalle_venta.objects.filter(venta_id=id).select_related('producto'):
                            producto = Producto.objects.get(id=i.producto_id)
                            producto.stock += i.cantidad
                            producto.save()
                        es.save()
                else:
                    data['error'] = 'Ha ocurrido un error'
            elif action == 'pagar':
                id = request.POST['id']
                if id:
                    with transaction.atomic():
                        es = Venta.objects.get(id=id)
                        es.estado = 1
                        es.save()
                else:
                    data['error'] = 'Ha ocurrido un error'
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        if self.request.user.tipo == 0:
            data['entidad'] = 'Compras'
            data['boton'] = 'Nueva Compra'
            data['titulo'] = 'Listado de Compras realizadas'
            data['titulo_lista'] = 'Listado de Compras realizadas'
        else:
            data['entidad'] = opc_entidad
            data['boton'] = 'Nueva Venta'
            data['titulo'] = 'Listado de Ventas'
            data['titulo_lista'] = 'Listado de Ventas'
        data['empresa'] = empresa
        return data


class lista_cliente(ListView):
    model = Venta
    template_name = 'front-end/venta/list.html'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'list':
                data = []
                query = Venta.objects.filter(cliente_id=request.user.id)
                for c in query:
                    data.append(c.toJSON())
            elif action == 'detalle':
                id = request.POST['id']
                if id:
                    data = []
                    result = Detalle_venta.objects.filter(venta_id=id)
                    for p in result:
                        data.append({
                            'producto': p.producto.producto_base.nombre,
                            'categoria': p.producto.producto_base.categoria.nombre,
                            'presentacion': p.producto.presentacion.nombre,
                            'cantidad': p.cantidad,
                            'pvp': p.pvp_actual,
                            'subtotal': p.subtotal
                        })
                else:
                    data['error'] = 'Ha ocurrido un error'
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Nueva Compra'
        data['titulo'] = 'Listado de Compras'
        data['titulo_lista'] = 'Listado de Compras'
        data['empresa'] = empresa
        return data


class CrudView(ValidatePermissionRequiredMixin, TemplateView):
    form_class = Venta
    template_name = 'front-end/venta/form.html'
    permission_required = 'venta.add_venta'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            if action == 'add':
                datos = json.loads(request.POST['ventas'])
                if datos:
                    with transaction.atomic():
                        c = Venta()
                        c.fecha = datos['fecha_venta']
                        c.cliente_id = datos['cliente']
                        c.subtotal = float(datos['subtotal'])
                        c.iva = float(datos['iva'])
                        c.total = float(datos['total'])
                        c.save()
                        if datos['productos']:
                            for i in datos['productos']:
                                dv = Detalle_venta()
                                dv.venta_id = c.id
                                dv.producto_id = int(i['id'])
                                dv.cantidad = int(i['cantidad'])
                                dv.pvp_actual = float(i['pvp'])
                                dv.subtotal = float(i['subtotal'])
                                dv.save()
                                stock = Producto.objects.get(id=i['id'])
                                stock.stock -= int(i['cantidad'])
                                stock.save()
                        if int(datos['forma_pago']) == 1:
                            verf = Cta_x_cobrar.objects.filter(venta__cliente_id=c.cliente_id, estado=0).count()
                            if verf <= 2:
                                cta = Cta_x_cobrar()
                                cta.venta_id = c.id
                                cta.valor = float(datos['total'])
                                cta.interes = float(datos['interes'])
                                cta.tolal_deuda = float(datos['total_deuda'])
                                cta.saldo = float(datos['total_deuda'])
                                cta.nro_cuotas = int(datos['nro_cuotas'])
                                cta.save()
                                c.tipo_pago = 1
                                c.save()
                                x = 1
                                ahora = datetime.now()
                                debito = (float(datos['letra']) * float(datos['nro_cuotas']))
                                calculo = (float(debito) - float(datos['total_deuda']))
                                for n in range(0, int(datos['nro_cuotas'])):
                                    fech = ahora + relativedelta(months=x)
                                    let = Pago_cta_x_cobrar()
                                    let.cta_cobrar_id = cta.id
                                    if fech.weekday() == 5:
                                        let.fecha = fech + dt.timedelta(days=2)
                                    elif fech.weekday() == 6:
                                        let.fecha = fech + dt.timedelta(days=1)
                                    else:
                                        let.fecha = fech
                                    if x == int(datos['nro_cuotas']):
                                        let.valor = float(datos['letra']) - float(calculo)
                                        let.saldo = float(datos['letra']) - float(calculo)
                                        print('valor ultimo')
                                        print(let.valor)
                                    else:
                                        let.valor = float(datos['letra'])
                                        let.saldo = float(datos['letra'])
                                    let.save()
                                    x = x + 1
                            else:
                                data['error'] = 'Este cliente tiene mas de dos creditos activos, Por favor intenta ' \
                                                'con otro cliente'
                        data['id'] = c.id
                        data['resp'] = True
                else:
                    data['resp'] = False
                    data['error'] = "Datos Incompletos"
            elif action == 'reserva':
                datos = json.loads(request.POST['ventas'])
                if datos:
                    with transaction.atomic():
                        c = Venta()
                        c.fecha = datos['fecha_venta']
                        c.cliente_id = datos['cliente']
                        c.subtotal = float(datos['subtotal'])
                        c.iva = float(datos['iva'])
                        c.total = float(datos['total'])
                        c.estado = 2
                        c.tipo_pago = 2
                        c.save()
                        if datos['productos']:
                            for i in datos['productos']:
                                dv = Detalle_venta()
                                dv.venta_id = c.id
                                dv.producto_id = int(i['id'])
                                dv.cantidad = int(i['cantidad'])
                                dv.pvp_actual = float(i['pvp'])
                                dv.subtotal = float(i['subtotal'])
                                dv.save()
                                stock = Producto.objects.get(id=i['id'])
                                stock.stock -= int(i['cantidad'])
                                stock.save()
                        data['id'] = c.id
                        data['resp'] = True
                else:
                    data['resp'] = False
                    data['error'] = "Datos Incompletos"
            elif action == 'list_list':
                data = []
                ids = json.loads(request.POST['ids'])
                for c in Producto.objects.all().select_related('producto_base').select_related('presentacion').exclude(id__in=ids):
                    data.append(c.toJSON())
            elif action == 'search_no_stock':
                ids = json.loads(request.POST['ids'])
                data = []
                term = request.POST['term']
                query = Producto.objects.values('id', 'producto_base__nombre', 'presentacion__nombre'). \
                    filter(producto_base__nombre__icontains=term).select_related('producto_base').select_related('presentacion')
                for a in query.exclude(id__in=ids):
                    result = {'id': int(a['id']),
                              'text': str(a['producto_base__nombre']) + ' / ' + str(a['presentacion__nombre'])}
                    data.append(result)
            elif action == 'search':
                data = []
                ids = json.loads(request.POST['ids'])
                term = request.POST['term']
                query = Producto.objects.filter(producto_base__nombre__icontains=term, stock__gte=1).select_related('producto_base').select_related('presentacion')
                for a in query.exclude(id__in=ids)[0:10]:
                    result = {'id': int(a.id), 'text': str(a.producto_base.nombre + ' / ' + str(a.presentacion.nombre))}
                    data.append(result)
            elif action == 'get':
                data = []
                id = request.POST['id']
                producto = Producto.objects.filter(pk=id)
                empresa = Empresa.objects.first()
                for i in producto:
                    item = i.toJSON()
                    item['cantidad'] = 1
                    item['subtotal'] = 0.00
                    item['iva_emp'] = empresa.iva
                    data.append(item)
            elif action == 'search_cli':
                data = []
                term = request.POST['term']
                query = User.objects.filter(
                    Q(first_name__icontains=term) | Q(last_name__icontains=term) | Q(cedula__icontains=term), tipo=0)[
                        0:10]
                for a in query:
                    item = a.toJSON()
                    item['text'] = a.get_full_name()
                    data.append(item)
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Guardar Venta'
        data['titulo'] = 'Nueva Venta'
        data['nuevo'] = '/venta/nuevo'
        data['empresa'] = empresa
        data['form'] = VentaForm()
        data['form2'] = Detalle_VentaForm()
        data['detalle'] = []
        data['formc'] = UserForm()
        data['formcredito'] = Cta_cobrarForm()
        data['formp'] = ClienteForm()
        data['titulo_modal_person'] = 'Registro de un nuevo Cliente'
        data['boton_fac'] = 'Facturar Venta'
        data['titulo_lista'] = 'Detalle de productos'
        data['titulo_detalle'] = 'Datos de la factura'
        return data


class CrudViewOnline(ValidatePermissionRequiredMixin, TemplateView):
    form_class = Venta
    template_name = 'front-end/venta/form.html'
    permission_required = 'venta.add_venta'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            if action == 'add':
                datos = json.loads(request.POST['ventas'])
                if datos:
                    with transaction.atomic():
                        c = Venta()
                        c.fecha = datos['fecha_venta']
                        c.cliente_id = datos['cliente']
                        c.subtotal = float(datos['subtotal'])
                        c.iva = float(datos['iva'])
                        c.total = float(datos['total'])
                        c.save()
                        if datos['productos']:
                            for i in datos['productos']:
                                dv = Detalle_venta()
                                dv.venta_id = c.id
                                dv.producto_id = int(i['id'])
                                dv.cantidad = int(i['cantidad'])
                                dv.pvp_actual = float(i['pvp'])
                                dv.subtotal = float(i['subtotal'])
                                dv.save()
                                stock = Producto.objects.get(id=i['id'])
                                stock.stock -= int(i['cantidad'])
                                stock.save()
                    data['id'] = c.id
                    data['resp'] = True
                else:
                    data['resp'] = False
                    data['error'] = "Datos Incompletos"
            elif action == 'reserva':
                datos = json.loads(request.POST['ventas'])
                if datos:
                    with transaction.atomic():
                        c = Venta()
                        c.fecha = datos['fecha_venta']
                        c.cliente_id = datos['cliente']
                        c.subtotal = float(datos['subtotal'])
                        c.iva = float(datos['iva'])
                        c.total = float(datos['total'])
                        c.estado = 2
                        c.save()
                        if datos['productos']:
                            for i in datos['productos']:
                                dv = Detalle_venta()
                                dv.venta_id = c.id
                                dv.producto_id = int(i['id'])
                                dv.cantidad = int(i['cantidad'])
                                dv.pvp_actual = float(i['pvp'])
                                dv.subtotal = float(i['subtotal'])
                                dv.save()
                                stock = Producto.objects.get(id=i['id'])
                                stock.stock -= int(i['cantidad'])
                                stock.save()
                        data['id'] = c.id
                        data['resp'] = True
                else:
                    data['resp'] = False
                    data['error'] = "Datos Incompletos"
            else:
                data['error'] = 'No ha seleccionado ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Guardar Venta'
        data['titulo'] = 'Nueva Venta'
        data['nuevo'] = '/venta/nuevo'
        data['empresa'] = empresa
        data['form'] = VentaForm()
        data['form2'] = Detalle_VentaForm()
        data['detalle'] = []
        data['formc'] = UserForm()
        return data


def CrudView_online(request):
    data = {}
    if request.user.is_authenticated:
        if request.method == 'GET':
            data['icono'] = opc_icono
            data['entidad'] = 'Compras'
            data['boton'] = 'Pagar'
            data['titulo'] = 'Pagar Compra'
            data['nuevo'] = '/'
            data['empresa'] = empresa
            data['form'] = VentaForm()
            data['form2'] = Detalle_VentaForm()
            data['detalle'] = []
            user = User.objects.get(cedula=request.user.cedula)
            data['user'] = user
            return render(request, 'front-end/venta/online.html', data)
    else:
        data['key'] = 1
        data['title'] = 'Inicio de Sesion'
        data['nomb'] = nombre_empresa()
        return render(request, 'front-end/login.html', data)


class printpdf(View):
    def link_callback(self, uri, rel):
        """
        Convert HTML URIs to absolute system paths so xhtml2pdf can access those
        resources
        """
        result = finders.find(uri)
        if result:
            if not isinstance(result, (list, tuple)):
                result = [result]
            result = list(os.path.realpath(path) for path in result)
            path = result[0]
        else:
            sUrl = settings.STATIC_URL  # Typically /static/
            sRoot = settings.STATIC_ROOT  # Typically /home/userX/project_static/
            mUrl = settings.MEDIA_URL  # Typically /media/
            mRoot = settings.MEDIA_ROOT  # Typically /home/userX/project_static/media/

            if uri.startswith(mUrl):
                path = os.path.join(mRoot, uri.replace(mUrl, ""))
            elif uri.startswith(sUrl):
                path = os.path.join(sRoot, uri.replace(sUrl, ""))
            else:
                return uri

        # make sure that file exists
        if not os.path.isfile(path):
            raise Exception(
                'media URI must start with %s or %s' % (sUrl, mUrl)
            )
        return path

    def pvp_cal(self, *args, **kwargs):
        data = []
        try:
            result = Detalle_venta.objects.filter(venta_id=self.kwargs['pk'])
            for i in result:
                item = i.toJSON()
                # item['pvp'] = format(i['pvp_actual'], '.2f')
                # item['cantidad'] = i['cantidad']
                # item['subtotal'] = i['subtotal']
                data.append(item)
        except:
            pass
        return data

    def get(self, request, *args, **kwargs):
        try:
            template = get_template('front-end/report/pdf.html')
            sale = Venta.objects.get(pk=self.kwargs['pk'])
            if sale.tipo_pago == 1:
                cta = Cta_x_cobrar.objects.get(venta_id=sale.id)
            else:
                cta = Cta_x_cobrar.objects.first()
            context = {'title': 'Comprobante de Venta',
                       'sale': sale,
                       'empresa': Empresa.objects.first(),
                       'det_sale': self.pvp_cal(),
                       'cta': cta,
                       }

            html = template.render(context)
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="report.pdf"'
            pisa_status = pisa.CreatePDF(html, dest=response, link_callback=self.link_callback)
            return response
        except Exception as e:
            pass
            print(e)
        return HttpResponseRedirect(reverse_lazy('venta:lista'))


@csrf_exempt
def grap(request):
    data = {}
    fecha = datetime.now()
    locale.setlocale(locale.LC_TIME, 'es_ES.UTF-8')
    try:
        action = request.POST['action']
        if action == 'chart':
            data = {
                'dat': {
                    'data': grap_data(),
                    'titulo': str('Total de ventas del año' + " " + str(fecha.year)),
                },
                'year': datetime.now().year,
                'chart2': {
                    'data': dataChart2(),
                    'titulo': str('Total de ventas del mes de' + " " + str(fecha.strftime("%B"))),
                },
                'tarjets': {
                    'data': data_tarjets()
                }
            }
        else:
            data['error'] = 'Ha ocurrido un error'
    except Exception as e:
        data['error'] = str(e)
    return JsonResponse(data, safe=False)


def grap_data():
    year = datetime.now().year
    data = []
    for y in range(1, 13):
        total = Venta.objects.filter(fecha__year=year, fecha__month=y, estado=1).aggregate(r=Coalesce
        (Sum('total'), 0)).get('r')
        data.append(float(total))
    return data


def data_tarjets():
    year = datetime.now()
    ventas = Venta.objects.filter(fecha__month=year.month, estado=1).aggregate(
        r=Coalesce(Sum('total'), 0)).get('r')
    ventas_anual = Venta.objects.filter(fecha__year=year.year, estado=1).aggregate(
        r=Coalesce(Sum('total'), 0)).get('r')
    compras = Compra.objects.filter(fecha_compra__month=year.month, estado=1).aggregate(
        r=Coalesce(Sum('total'), 0)).get('r')
    compras_anual = Compra.objects.filter(fecha_compra__year=year.year, estado=1).aggregate(
        r=Coalesce(Sum('total'), 0)).get('r')
    # inventario = Inventario.objects.filter(produccion__fecha_ingreso__year=year, estado=1).aggregate(
    #     r=Coalesce(Count('id'), 0)).get('r')
    # agotados = Producto.objects.filter(producto_base__stock__lte=0).count()
    data = {
        'ventas': float(ventas),
        'ventas_anuales': float(ventas_anual),
        'compras': float(compras),
        'compras_anual': float(compras_anual),
        # 'inventario': int(inventario),
        # 'agotados': int(agotados),
    }
    return data


def dataChart2():
    year = datetime.now().year
    month = datetime.now().month
    data = []
    producto = Producto.objects.all()
    for p in producto:
        total = Detalle_venta.objects.filter(venta__fecha__year=year,
                                             venta__fecha__month=month,
                                             producto_id=p).aggregate(
            r=Coalesce(Sum('venta__total'), 0)).get('r')
        if total>1:
            data.append({
                'name': p.producto_base.nombre,
                'y': float(total)
            })
    return data


def datachartcontr():
    year = datetime.now().year
    data = []
    for y in range(1, 13):
        totalc = Compra.objects.filter(fecha_compra__year=year, fecha_compra__month=y, estado=1).aggregate(
            r=Coalesce(Sum('total'), 0)).get('r')
        data.append(float(totalc))
    return data


class report(ValidatePermissionRequiredMixin, ListView):
    model = Venta
    template_name = 'front-end/venta/report_product.html'
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
        data['titulo'] = 'Reporte de Ventas por productos'
        data['empresa'] = empresa
        data['titulo_lista'] = 'Ventas por productos'
        data['year'] = year
        data['producto'] = producto
        return data


class report_total(ValidatePermissionRequiredMixin, ListView):
    model = Venta
    template_name = 'front-end/venta/report_total.html'
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
            action = request.POST['action']
            if action == 'report':
                data = []
                if start_date == '' and end_date == '':
                    query = Venta.objects.values('fecha', 'cliente__nombres', 'tipo_venta',
                                                 'cliente__apellidos').annotate(Sum('subtotal')). \
                        annotate(Sum('iva')).annotate(Sum('total')).filter(estado=1)
                else:
                    query = Venta.objects.values('fecha', 'cliente__nombres', 'tipo_venta',
                                                 'cliente__apellidos').filter(fecha__range=[start_date, end_date],
                                                                              estado=1) \
                        .annotate(Sum('subtotal')).annotate(Sum('iva')).annotate(Sum('total'))
                for p in query:
                    if p['tipo_venta'] == 0:
                        tipo = 'Fisica'
                    else:
                        tipo = 'OnLine'
                    data.append([
                        p['fecha'].strftime("%d/%m/%Y"),
                        p['cliente__nombres'] + " " + p['cliente__apellidos'],
                        tipo,
                        format(p['subtotal__sum'], '.2f'),
                        format((p['iva__sum']), '.2f'),
                        format(p['total__sum'], '.2f')
                    ])
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = 'No ha seleccionado una opcion'
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = 'Ventas Finalizadas (Fisicas)'
        data['titulo'] = 'Reporte de Ventas (Fisicas)'
        data['empresa'] = empresa
        data['filter_prod'] = '/venta/lista'
        data['titulo_lista'] = 'Lista de Ventas finalizadas (Fisicas)'
        return data


class report_total_reserva(ValidatePermissionRequiredMixin, ListView):
    model = Venta
    template_name = 'front-end/venta/report_total_reserva.html'
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
            action = request.POST['action']
            if action == 'report':
                data = []
                if start_date == '' and end_date == '':
                    query = Venta.objects.values('fecha', 'cliente__nombres',
                                                 'cliente__apellidos') \
                        .annotate(Sum('subtotal')). \
                        annotate(Sum('iva')).annotate(Sum('total')).filter(estado=2)
                else:
                    query = Venta.objects.values('fecha', 'cliente__nombres', 'cliente__apellidos').filter(
                        fecha__range=[start_date, end_date], estado=2).annotate(Sum('subtotal')). \
                        annotate(Sum('iva')).annotate(Sum('total'))
                for p in query:
                    data.append([
                        p['fecha'].strftime("%d/%m/%Y"),
                        p['cliente__nombres'] + " " + p['cliente__apellidos'],
                        format(p['subtotal__sum'], '.2f'),
                        format((p['iva__sum']), '.2f'),
                        format(p['total__sum'], '.2f')
                    ])
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = 'No ha seleccionado una opcion'
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = 'Ventas Reservadas'
        data['titulo'] = 'Reporte de Pedidos'
        data['titulo_lista'] = 'Lista de Ventas reservadas'
        data['empresa'] = empresa
        return data
