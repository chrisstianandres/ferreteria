import json
import os

from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *

from apps.backEnd import nombre_empresa, verificar
from apps.cliente.forms import ClienteForm
from apps.cliente.models import Cliente
from apps.mixins import ValidatePermissionRequiredMixin
from apps.ubicacion.models import *
from apps.user.models import User

opc_icono = 'fa fa-user'
opc_entidad = 'Clientes'
crud = '/cliente/nuevo'
empresa = nombre_empresa()


class lista(ValidatePermissionRequiredMixin, ListView):
    model = Cliente
    template_name = "front-end/cliente/list.html"
    permission_required = 'cliente.view_cliente'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}

        try:
            action = request.POST['action']
            if action == 'list':
                data = []
                for c in User.objects.filter(tipo=0).iterator():
                    data.append(c.toJSON())
            else:
                data['error'] = 'No ha seleccionado una opcion'
            import json
        except Exception as e:
            data['error'] = str(e)
            print(e)
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Guardar'
        data['titulo'] = 'Listado de Clientes'
        data['titulo_lista'] = 'Listado de Clientes'
        data['titulo_formulario'] = 'Formulario de Registro'
        data['form'] = ClienteForm
        data['nuevo'] = '/cliente/nuevo'
        data['empresa'] = empresa
        return data


class CrudView(ValidatePermissionRequiredMixin, TemplateView):
    form_class = ClienteForm
    template_name = 'front-end/cliente/form.html'
    permission_required = 'cliente.add_cliente'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            if action == 'add':
                f = ClienteForm(request.POST)
                if User.objects.filter(email=f.data['email']):
                    data['error'] = 'Ya existe un cliente con este correo'
                else:
                    data = self.save_data(f)
            elif action == 'edit':
                pk = request.POST['id']
                cliente = User.objects.get(pk=int(pk))
                f = ClienteForm(request.POST, instance=cliente)
                if User.objects.filter(email=f.data['email']):
                    data['error'] = 'Ya existe un cliente con este correo'
                else:
                    data = self.save_data(f)
            elif action == 'delete':
                pk = request.POST['id']
                cli = User.objects.get(pk=pk)
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
            prod = f.save()
            data['resp'] = True
            # print(prod)
            data['cliente'] = prod.toJSON()
        else:
            data['error'] = f.errors
        return data


class report(ValidatePermissionRequiredMixin, ListView):
    model = Cliente
    template_name = 'front-end/cliente/report.html'
    permission_required = 'cliente.view_cliente'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return Cliente.objects.none()

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        if action == 'report':
            data = []
            start_date = request.POST.get('start_date', '')
            end_date = request.POST.get('end_date', '')
            try:
                if start_date == '' and end_date == '':
                    query = Cliente.objects.all()
                else:
                    query = Cliente.objects.filter(fecha__range=[start_date, end_date])

                for p in query:
                    data.append(p.toJSON())
            except:
                pass
            return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['titulo'] = 'Reporte de Clientes'
        data['empresa'] = empresa
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