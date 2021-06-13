import json
from datetime import datetime

from django.db.models import Q
from django.http import HttpResponse
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, TemplateView

from apps.backEnd import nombre_empresa, verificar
from apps.mixins import ValidatePermissionRequiredMixin
from apps.proveedor.forms import ProveedorForm
from apps.proveedor.models import Proveedor

opc_icono = 'fas fa-user-tag'
opc_entidad = 'Proveedores'
crud = '/proveedor/crear'
empresa = nombre_empresa()


class lista(ValidatePermissionRequiredMixin, ListView):
    model = Proveedor
    template_name = "front-end/proveedor/list.html"
    permission_required = 'proveedor.view_proveedor'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            action = request.POST['action']
            if action == 'list':
                data = []
                for c in Proveedor.objects.all():
                    data.append(c.toJSON())
            elif action == 'search':
                data = []
                term = request.POST['term']
                query = Proveedor.objects.filter(
                    Q(nombre__icontains=term) | Q(num_doc__icontains=term))[0:10]
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
        data['boton'] = 'Nuevo Porveedor'
        data['titulo'] = 'Listado de Porveedores'
        data['titulo_lista'] = 'Listado de Porveedores'
        data['form'] = ProveedorForm
        data['nuevo'] = '/proveedor/nuevo'
        data['empresa'] = empresa
        return data


class CrudView(ValidatePermissionRequiredMixin, TemplateView):
    form_class = ProveedorForm
    template_name = 'front-end/proveedor/form.html'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        pk = request.POST['id']
        try:
            if action == 'add':
                f = ProveedorForm(request.POST)
                data = self.save_data(f)
            elif action == 'edit':
                proveedor = Proveedor.objects.get(pk=int(pk))
                f = ProveedorForm(request.POST, instance=proveedor)
                data = self.save_data(f)
            elif action == 'delete':
               pro = Proveedor.objects.get(pk=pk)
               pro.delete()
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
            if int(f.data['tipo']) == 0:
                if verificar(f.data['num_doc']):
                    prod = f.save()
                    data['resp'] = True
                    data['proveedor'] = prod.toJSON()
                else:
                    f.add_error("num_doc", "Numero de Cedula no valido para Ecuador")
                    data['error'] = f.errors
            else:
                if verificar(f.data['num_doc']):
                    prod = f.save()
                    data['resp'] = True
                    data['proveedor'] = prod.toJSON()
                else:
                    f.add_error("num_doc", "Numero de Ruc no valido para Ecuador")
                    data['error'] = f.errors
        else:
            data['error'] = f.errors
        return data


class report(ValidatePermissionRequiredMixin, ListView):
    model = Proveedor
    template_name = 'front-end/proveedor/report.html'
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
                    query = self.model.objects.filter(fecha__range=[start_date, end_date])
                elif key == '1':
                    query = self.model.objects.filter(fecha__year=start_date, fecha__month=end_date)
                elif key == '4':
                    if start_date != '':
                        query = self.model.objects.filter(nombre__icontains=str(start_date))
                    else:
                        query = self.model.objects.none()
                else:
                    query = self.model.objects.all()
                for p in query:
                    data.append(p.toJSON())
            except Exception as e:
                data['error'] = str(e)
            return JsonResponse(data, safe=False)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = 'Reporte de Proveedores'
        data['titulo'] = 'Reporte de Proveedores'
        data['empresa'] = empresa
        data['titulo_lista'] = 'Listado de Proveedores'
        data['years'] = [{'id': y, 'year': datetime.now().year - y} for y in range(0, 5)]
        return data



