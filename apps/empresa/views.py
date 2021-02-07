from django.shortcuts import render

from apps.empresa.forms import EmpresaForm
from apps.empresa.models import Empresa
import json

opc_icono = 'fa fa-cogs'
opc_entidad = 'Configuracion'
crud = '/empresa/configuracion/'


def editar(request):
    config = Empresa.objects.first()
    data = {
        'icono': opc_icono, 'crud': crud, 'entidad': opc_entidad, 'empresa': config,
        'boton': 'Editar', 'titulo': 'Configuracion', 'form': EmpresaForm(instance=config),
        'id_prov': config.ubicacion.canton.provincia.id, 'id_text': config.ubicacion.canton.provincia.nombre,
        'id_cant': config.ubicacion.canton.id, 'id_text_cant': config.ubicacion.canton.nombre,
        'id_parr': config.ubicacion.id, 'id_text_parr': config.ubicacion.nombre,

    }
    if request.method == 'GET':
        f = EmpresaForm(instance=config)
    else:
        f = EmpresaForm(request.POST, instance=config)
        print(f.data['ubicacion'])
        if f.is_valid():
            f.save()
            data = {
                'icono': opc_icono, 'crud': crud, 'entidad': opc_entidad, 'empresa': config,
                'boton': 'Editar', 'titulo': 'Configuracion', 'form': EmpresaForm(instance=config),
                'id_prov': config.ubicacion.canton.provincia.id, 'id_text': config.ubicacion.canton.provincia.nombre,
                'id_cant': config.ubicacion.canton.id, 'id_text_cant': config.ubicacion.canton.nombre,
                'id_parr': config.ubicacion.id, 'id_text_parr': config.ubicacion.nombre,
            }
        else:
            data['form'] = f
            print(f.errors)
        return render(request, 'front-end/empresa/empresa_form.html', data)
    data['form'] = f
    return render(request, 'front-end/empresa/empresa_form.html', data)