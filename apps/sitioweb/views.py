import json

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import *

from apps.backEnd import nombre_empresa
from apps.cliente.forms import ClienteForm
from apps.cliente.models import Cliente
from apps.mixins import ValidatePermissionRequiredMixin
from apps.sitioweb.forms import SitiowebForm
from apps.sitioweb.models import SitioWeb

opc_icono = 'fa fa-newspaper fa'
opc_entidad = 'Sitio Web'
crud = '/sitio/configurar'
empresa = nombre_empresa()


class lista(ValidatePermissionRequiredMixin, ListView):
    model = SitioWeb
    template_name = "front-end/sitio/list.html"
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
                for c in Cliente.objects.all():
                    data.append(c.toJSON())
            elif action == 'search':
                data = []
                term = request.POST['term']
                query = Cliente.objects.filter(
                    Q(nombres__icontains=term) | Q(apellidos__icontains=term) | Q(cedula__icontains=term))[0:10]
                for a in query:
                    item = a.toJSON()
                    item['text'] = a.get_full_name()
                    data.append(item)
            else:
                data['error'] = 'No ha seleccionado una opcion'
        except Exception as e:
            data['error'] = 'No ha seleccionado una opcion'
        return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Nuevo Cliente'
        data['titulo'] = 'Listado de Clientes'
        data['form'] = ClienteForm
        data['nuevo'] = '/cliente/nuevo'
        data['empresa'] = empresa
        return data


class CrudView(ValidatePermissionRequiredMixin, TemplateView):
    form_class = SitiowebForm
    template_name = 'front-end/sitio/form.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
                web = SitioWeb.objects.first()
                f = SitiowebForm(request.POST, instance=web)
                data = self.save_data(f)
                return HttpResponseRedirect('/')
        except ObjectDoesNotExist:
            f = SitiowebForm(request.POST)
            data = self.save_data(f)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def save_data(self, f):
        data = {}
        if f.is_valid():
            f.save()
        else:
            data['error'] = f.errors
        return data

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        web = SitioWeb.objects.get(pk=1)
        if SitioWeb.objects.exists():
            data['form'] = SitiowebForm(instance=web)
        else:
            data['form'] = SitiowebForm()
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['boton'] = 'Guardar'
        data['titulo'] = 'Sitio web'
        data['empresa'] = empresa
        return data


def sitio(request):
    data = {'empresa': empresa}
    if request.user.is_authenticated:
        data['group'] = request.user.get_tipo_display
    else:
        data['group'] = 'NONE'
    return render(request,  'front-end/sitio/index.html', data)




