import json
from datetime import datetime

from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *

from apps.backEnd import nombre_empresa
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
    model = User
    template_name = 'front-end/cliente/report.html'
    permission_required = 'view_reportes'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return self.model.objects.none()

    def post(self, request, *args, **kwargs):
        action = request.POST['action']
        if action == 'report':
            start_date = request.POST['start_date']
            end_date = request.POST['end_date']
            key = request.POST['key']
            data = {}
            try:
                data = []
                if key == '0' or key == '2':
                    query = self.model.objects.filter(date_joined__range=[start_date, end_date], tipo=0)
                elif key == '1':
                    query = self.model.objects.filter(date_joined__year=start_date, date_joined__month=end_date, tipo=0)
                elif key == '4':
                    if start_date != '':
                        query = self.model.objects.filter(Q(first_name__icontains=str(start_date)) | Q(last_name__icontains=str(start_date)), tipo=0)
                    else:
                        query = self.model.objects.none()
                else:
                    query = self.model.objects.filter(tipo=0)
                for p in query:
                    data.append(p.toJSON())
            except Exception as e:
                data['error'] = str(e)
            return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = 'Reporte de Clientes'
        data['titulo'] = 'Reporte de Clientes'
        data['empresa'] = empresa
        data['titulo_lista'] = 'Listado de Clientes'
        data['years'] = [{'id': y, 'year': datetime.now().year - y} for y in range(0, 5)]
        data['names'] = [{'id': n.id, 'full_name': n.get_full_name} for n in self.model.objects.filter(tipo=0)]
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