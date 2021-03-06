import json
from PIL import Image

from datetime import datetime, timedelta

from django.db import transaction
from django.db.models import Q, Sum, Max, Count
from django.db.models.functions import Coalesce
from django.http import HttpResponseRedirect, HttpResponse
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *

from apps.backEnd import nombre_empresa
from apps.categoria.forms import CategoriaForm
from apps.empresa.models import Empresa
from apps.inventario.models import Inventario
from apps.mixins import ValidatePermissionRequiredMixin
from apps.presentacion.forms import PresentacionForm
from apps.producto.forms import ProductoForm, Producto_baseForm
from apps.producto.models import Producto
from apps.producto_base.models import Producto_base
from apps.venta.models import Detalle_venta

opc_icono = 'fab fa-amazon'
opc_entidad = 'Productos'
crud = '/producto/nuevo'
empresa = nombre_empresa()


class lista(ValidatePermissionRequiredMixin, ListView):
    model = Producto
    template_name = 'front-end/producto/list.html'
    permission_required = 'producto.view_producto'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'list':
                data = []

                for c in Producto.objects.all():
                    data.append(c.toJSON())
            elif action == 'sitio':
                data = []
                h = datetime.today()
                query = Detalle_venta.objects.filter(venta__transaccion__fecha_trans__month=h.month,
                                                           venta__estado=1).values('inventario__producto__producto_base_id',
                                                                                   'inventario__producto_id',
                                                                                   'inventario__producto__pvp',
                                                                                   'inventario__producto__imagen').annotate(total=Sum('cantidad')).order_by('-total')[0:3]
                for i in query:
                    px = Producto_base.objects.get(id=int(i['inventario__producto__producto_base_id']))
                    pr = Producto.objects.get(id=int(i['inventario__producto_id']))
                    item = {'info': px.nombre, 'descripcion': px.descripcion}
                    item['id_venta'] = int(i['inventario__producto_id'])
                    item['id_reparacion'] = int(pr.id)
                    item['id_confeccion'] = int(pr.id)
                    item['pvp'] = format(i['inventario__producto__pvp'], '.2f')
                    item['pvp_alq'] = format(i['inventario__producto__pvp_alq'], '.2f')
                    item['pvp_confec'] = format(i['inventario__producto__pvp_confec'], '.2f')
                    item['imagen'] = pr.get_image()
                    data.append(item)
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
        data['titulo'] = 'Listado de Productos'
        data['titulo_lista'] = 'Listado de Productos'
        data['nuevo'] = '/producto/nuevo'
        data['form_cat'] = CategoriaForm
        data['form_pres'] = PresentacionForm
        data['form_prod'] = Producto_baseForm
        if 'form' not in data:
            data['form'] = ProductoForm
        data['empresa'] = empresa
        return data


class report(ValidatePermissionRequiredMixin, ListView):
        model = Producto
        template_name = 'front-end/producto/report.html'
        permission_required = 'producto.view_producto'

        @csrf_exempt
        def dispatch(self, request, *args, **kwargs):
            return super().dispatch(request, *args, **kwargs)

        def post(self, request, *args, **kwargs):
            data = {}
            try:
                action = request.POST['action']
                if action == 'report':
                    data = []
                    for c in Producto.objects.all().select_related('producto_base').select_related('presentacion'):
                        data.append(c.toJSON())
                else:
                    data['error'] = 'No ha seleccionado una opcion'
            except Exception as e:
                data['error'] = 'No ha seleccionado una opcion'
            return JsonResponse(data, safe=False)

        def get_context_data(self, **kwargs):
            data = super().get_context_data(**kwargs)
            data['icono'] = opc_icono
            data['entidad'] = opc_entidad
            data['boton'] = 'Nuevo Producto'
            data['titulo'] = 'Reporte de Stock de Productos'
            data['titulo_lista'] = 'Listado de Productos'
            data['empresa'] = empresa
            return data


class sitio(ListView):
    model = Producto

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'sitio':
                mas = []
                pop = []
                h = datetime.today()
                query = Detalle_venta.objects.filter(venta__transaccion__fecha_trans__month=h.month,
                                                           venta__estado=1).values('inventario__producto__producto_base_id',
                                                                                   'inventario__producto_id',
                                                                                   'inventario__producto__pvp',
                                                                                   'inventario__producto__pvp_alq',
                                                                                   'inventario__producto__pvp_confec',
                                                                                   'inventario__producto__imagen').annotate(total=Sum('cantidad')).order_by('-total')[0:6]
                for i in query:
                    px = Producto_base.objects.get(id=int(i['inventario__producto__producto_base_id']))
                    pr = Producto.objects.get(id=int(i['inventario__producto_id']))
                    item = {'info': px.nombre, 'descripcion': px.descripcion}
                    item['id_venta'] = int(i['inventario__producto_id'])
                    item['id_reparacion'] = int(pr.id)
                    item['id_confeccion'] = int(pr.id)
                    item['pvp'] = format(i['inventario__producto__pvp'], '.2f')
                    item['pvp_alq'] = format(i['inventario__producto__pvp_alq'], '.2f')
                    item['pvp_confec'] = format(i['inventario__producto__pvp_confec'], '.2f')
                    item['imagen'] = pr.get_image()
                    item['stock'] = px.stock
                    mas.append(item)
                data['masvendidos'] = mas

                query2 = Detalle_venta.objects.filter(venta__transaccion__fecha_trans__month=h.month,
                                                     venta__estado=2).values('inventario__producto__producto_base_id',
                                                                             'inventario__producto_id',
                                                                             'inventario__producto__pvp',
                                                                             'inventario__producto__pvp_alq',
                                                                             'inventario__producto__pvp_confec',
                                                                             'inventario__producto__imagen').annotate(
                    total=Sum('cantidad')).order_by('-total')[0:6]
                for i in query2:
                    px = Producto_base.objects.get(id=int(i['inventario__producto__producto_base_id']))
                    pr = Producto.objects.get(id=int(i['inventario__producto_id']))
                    item = {'info': px.nombre, 'descripcion': px.descripcion}
                    item['id_venta'] = int(i['inventario__producto_id'])
                    item['id_reparacion'] = int(pr.id)
                    item['id_confeccion'] = int(pr.id)
                    item['pvp'] = format(i['inventario__producto__pvp'], '.2f')
                    item['pvp_alq'] = format(i['inventario__producto__pvp_alq'], '.2f')
                    item['pvp_confec'] = format(i['inventario__producto__pvp_confec'], '.2f')
                    item['imagen'] = pr.get_image()
                    item['stock'] = px.stock
                    pop.append(item)
                data['popular'] = pop
            if action == 'categoria':
                tipo = str(request.POST['tipo'])
                mas = []
                query = Producto.objects.filter(producto_base__categoria__nombre__icontains=tipo).\
                                values('producto_base_id', 'producto_base__nombre', 'producto_base__descripcion', 'id',
                                       'pvp', 'pvp_alq', 'pvp_confec')
                for i in query:
                    pb =Producto.objects.get(id=i['id'])
                    item = {'info': i['producto_base__nombre'], 'descripcion': i['producto_base__descripcion']}
                    item['id_venta'] = int(i['id'])
                    item['id_reparacion'] = int(i['id'])
                    item['id_confeccion'] = int(i['id'])
                    item['pvp'] = format(i['pvp'], '.2f')
                    item['pvp_alq'] = format(i['pvp_alq'], '.2f')
                    item['pvp_confec'] = format(i['pvp_confec'], '.2f')
                    item['imagen'] = pb.get_image()
                    item['stock'] = pb.producto_base.stock
                    mas.append(item)
                data['result'] = mas
                # query2 = Detalle_venta.objects.filter(venta__transaccion__fecha_trans__month=h.month,
                #                                      venta__estado=2).values('inventario__producto__producto_base_id',
                #                                                              'inventario__producto_id',
                #                                                              'inventario__producto__pvp',
                #                                                              'inventario__producto__pvp_alq',
                #                                                              'inventario__producto__pvp_confec',
                #                                                              'inventario__producto__imagen').annotate(
                #     total=Sum('cantidad')).order_by('-total')[0:3]
                # for i in query2:
                #     px = Producto_base.objects.get(id=int(i['inventario__producto__producto_base_id']))
                #     pr = Producto.objects.get(id=int(i['inventario__producto_id']))
                #     item = {'info': px.nombre, 'descripcion': px.descripcion}
                #     item['id_venta'] = int(i['inventario__producto_id'])
                #     item['id_reparacion'] = int(pr.id)
                #     item['id_confeccion'] = int(pr.id)
                #     item['pvp'] = format(i['inventario__producto__pvp'], '.2f')
                #     item['pvp_alq'] = format(i['inventario__producto__pvp_alq'], '.2f')
                #     item['pvp_confec'] = format(i['inventario__producto__pvp_confec'], '.2f')
                #     item['imagen'] = pr.get_image()
                #     pop.append(item)
                # data['popular'] = pop
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = 'No ha seleccionado una opcion'
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Nuevo Producto'
        data['titulo'] = 'Listado de Productos'
        data['nuevo'] = '/producto/nuevo'
        data['empresa'] = empresa
        return data


class Createview(ValidatePermissionRequiredMixin, CreateView):
    model = Producto
    form_class = ProductoForm
    success_url = 'producto:lista'
    template_name = 'front-end/producto/form.html'
    permission_required = 'producto.add_producto'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            if action == 'add':
                with transaction.atomic():
                    f = self.form_class(request.POST or None, request.FILES or None)
                    if f.is_valid():
                        f.save(commit=False)
                        if (Producto.objects.filter(producto_base_id=int(f.data['producto_base']),
                                                    presentacion_id=int(f.data['presentacion']))):
                            f.add_error("presentacion", "Ya existe este producto con esta presentacion")
                            data['error'] = f.errors
                        else:
                            if f.files:
                                var = f.save()
                                image = Image.open(var.imagen)
                                size = (1000, 1000)
                                image = image.resize(size, Image.ANTIALIAS)
                                image.save(var.imagen.path)
                                data['producto_base'] = var.toJSON()
                                data['resp'] = True
                            else:
                                var = f.save()
                                data['producto_base'] = var.toJSON()
                                data['resp'] = True
                    else:
                        data['error'] = f.errors
            elif action == 'delete':
                with transaction.atomic():
                    pk = request.POST['id']
                    f = Producto.objects.get(pk=pk)
                    f.delete()
            elif action == 'search':
                data = []
                term = request.POST['term']
                query = Producto_base.objects.filter(nombre__icontains=term)[0:10]
                for a in query:
                    result = {'id': int(a.id), 'text': 'Nombre: ' + str(a.nombre) + ' / ' + 'Descripcion: ' + str(a.descripcion)}
                    data.append(result)
            elif action == 'add_base':
                f = Producto_baseForm(request.POST)
                data = self.save_data(f)
            elif action == 'edit_base':
                pk = request.POST['id']
                prod_base = Producto_base.objects.filter(id=pk).first()
                f = Producto_baseForm(request.POST, instance=prod_base)
                data = self.save_data(f)
            elif action == 'get':
                data = []
                pk = request.POST['id']
                query = Producto_base.objects.get(id=pk)
                item = query.toJSON()
                data.append(item)
            elif action == 'edit':
                pk = request.POST['id']
                producto = Producto.objects.get(pk=pk)
                f = self.form_class(request.POST or None, request.FILES or None, instance=producto)
                if f.is_valid():
                    f.save(commit=False)
                    if (Producto.objects.filter(producto_base_id=int(f.data['producto_base']),
                                                presentacion_id=int(f.data['presentacion'])).exclude(pk=pk)):
                        f.add_error("presentacion", "Ya existe este producto con esta presentacion")
                        data['error'] = f.errors
                    else:

                        if f.files:
                            var = f.save()
                            image = Image.open(var.imagen)
                            size = (1000, 1000)
                            image = image.resize(size, Image.ANTIALIAS)
                            image.save(var.imagen.path)
                            data['producto_base'] = var.toJSON()
                            data['resp'] = True
                        else:
                            var = f.save()
                            data['producto_base'] = var.toJSON()
                            data['resp'] = True
                else:
                    data['error'] = f.errors
            else:
                data['error'] = 'No ha seleccionado ninguna opción'
        except Exception as e:
            data['error'] = str(e)
            print(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def save_data(self, f):
        data = {}
        if f.is_valid():
            var = f.save()
            data['producto_base'] = var.toJSON()
            data['resp'] = True
        else:
            data['error'] = f.errors
        return data



    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Guardar Producto'
        data['titulo'] = 'Nuevo Registro de un Producto'
        data['nuevo'] = '/producto/nuevo'
        data['action'] = 'add'
        data['crud'] = crud

        return data


class Updateview(ValidatePermissionRequiredMixin, UpdateView):
    model = Producto
    form_class = ProductoForm
    success_url = 'producto:lista'
    template_name = 'front-end/producto/list.html'
    permission_required = 'producto.change_producto'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            pk = self.kwargs.get('pk', 0)
            producto = self.model.objects.get(id=pk)
            if action == 'edit':
                f = self.form_class(request.POST or None, request.FILES or None, instance=producto)
                if f.is_valid():
                    if f.files['imagen']:
                        var = f.save()
                        image = Image.open(var.imagen)
                        size = (1000, 1000)
                        image = image.resize(size, Image.ANTIALIAS)
                        image.save(var.imagen.path)
                        data['producto_base'] = var.toJSON()
                        data['resp'] = True
                    else:
                        var = f.save()
                        data['producto_base'] = var.toJSON()
                        data['resp'] = True
                else:
                    data['error'] = f.errors
                    data['form'] = f
            else:
                data['error'] = 'No ha seleccionado ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')


@csrf_exempt
def index(request):
    data = {}
    try:
        data = []
        for p in Producto.objects.filter(producto_base__stock__lt=10, producto_base__stock__gt=1):
            data.append(p.toJSON())
    except Exception as e:
        data['error'] = str(e)
    return JsonResponse(data, safe=False)


@csrf_exempt
def get_prod(request):
    data = {}
    try:
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
    except Exception as e:
        data['error'] = str(e)
    return JsonResponse(data, safe=False)
