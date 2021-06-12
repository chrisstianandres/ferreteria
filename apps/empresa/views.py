import json

from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

from apps.empresa.forms import EmpresaForm
from apps.empresa.models import Empresa
from apps.mixins import ValidatePermissionRequiredMixin

opc_icono = 'fa fa-cogs'
opc_entidad = 'Configuracion'
crud = '/empresa/configuracion/'


class editar(ValidatePermissionRequiredMixin, TemplateView):
    form_class = EmpresaForm
    template_name = 'front-end/empresa/empresa_form.html'
    permission_required = 'change_empresa'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        config = Empresa.objects.first()
        try:
            dato = request.POST
            foto = request.FILES
            if dato:
                config.nombre = dato['nombre']
                config.ubicacion_id = dato['ubicacion']
                config.direccion = dato['direccion']
                config.ruc = dato['ruc']
                config.correo = dato['correo']
                config.telefono = dato['telefono']
                config.facebook = dato['facebook']
                config.twitter = dato['twitter']
                config.instagram = dato['instagram']
                config.iva = dato['iva']
                config.indice = dato['indice']
                config.tasa = dato['tasa']
                if foto:
                    config.foto = foto['foto']
                config.save()
                data['resp'] = True
            else:
                data['error'] = 'Datos incompletos'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get_context_data(self, **kwargs):
        config = Empresa.objects.first()
        data = super().get_context_data(**kwargs)
        data['icono'] = opc_icono
        data['entidad'] = opc_entidad
        data['crud'] = crud
        data['empresa'] = config
        data['boton'] = 'Editar'
        data['titulo'] = 'Configuracion'
        data['id_prov'] = config.ubicacion.canton.provincia.id
        data['id_text'] = config.ubicacion.canton.provincia.nombre
        data['id_cant'] = config.ubicacion.canton.id
        data['id_text_cant'] = config.ubicacion.canton.nombre
        data['form'] = EmpresaForm(instance=config)
        data['id_parr'] = config.ubicacion.id
        data['id_text_parr'] = config.ubicacion.nombre
        return data