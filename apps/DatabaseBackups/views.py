import json
import os
import subprocess
from datetime import datetime

from django.core.files import File
from django.db import connection
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView, TemplateView, DeleteView

from apps.DatabaseBackups.models import DatabaseBackups
from apps.backEnd import nombre_empresa, JsonResponse
from apps.mixins import ValidatePermissionRequiredMixin
from ferreteria.settings import BASE_DIR

opc_icono = 'fas fa-database'
opc_entidad = 'Respaldo de Base de Datos'
crud = '/database_backup/nuevo'
empresa = nombre_empresa()


class DatabaseBackupsListView(ValidatePermissionRequiredMixin, ListView):
    model = DatabaseBackups
    template_name = 'front-end/databasebackups/backup_list.html'
    permission_required = 'view_databasebackups'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:

            if action == 'list':
                data = []
                for d in DatabaseBackups.objects.all():
                    data.append(d.toJSON())
            elif action == 'delete_access_all':
                data = []
                DatabaseBackups.objects.all().delete()
            else:
                data['error'] = 'No ha ingresado una opción'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['titulo'] = 'Listado de respaldos de la base de datos'
        context['nuevo'] = reverse_lazy('database_backup:nuevo')
        context['icono'] = opc_icono
        context['entidad'] = opc_entidad
        context['titulo_lista'] = 'Listado de respaldos de la base de datos'
        context['boton'] = 'Crear Respaldo'
        context['empresa'] = empresa
        return context


class DatabaseBackupsCreateView(ValidatePermissionRequiredMixin, TemplateView):
    template_name = 'front-end/databasebackups/create.html'
    success_url = reverse_lazy('database_backup:lista')
    permission_required = 'add_databasebackups'

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def create_backup_sqlite(self):
        file = ''
        data = {}
        try:
            db_name = connection.settings_dict['NAME']
            data_now = '{0:%Y-%m-%d_%H:%M:%S}'.format(datetime.now())
            name_backup = "{}_{}.db".format('backup', data_now)
            script = ' {} {} ".backup {}"'.format('sqlite3', db_name, "'{}'".format(name_backup))
            subprocess.call(script, shell=True)
            file = os.path.join(BASE_DIR, name_backup)
            db = DatabaseBackups()
            db.user = self.request.user
            db.archive.save(name_backup, File(open(file, 'rb')), save=False)
            db.save()
        except Exception as e:
            data['error'] = str(e)
        finally:
            if len(file):
                os.remove(file)
        return data

    def create_backup_postgresql(self):
        file = ''
        data = {}
        try:
            db_name = connection.settings_dict['NAME']
            data_now = '{0:%Y-%m-%d_%H:%M:%S}'.format(datetime.now())
            name_backup = "{}_{}.backup".format('backup', data_now)
            script = 'pg_dump -h localhost -p 5432 -U postgres -F c -b -v -f "{}" {}'.format(name_backup, db_name)
            subprocess.call(script, shell=True)
            file = os.path.join(BASE_DIR, name_backup)
            db = DatabaseBackups()
            db.user = self.request.user
            db.archive.save(name_backup, File(open(file, 'rb')), save=False)
            db.save()
        except Exception as e:
            data['error'] = str(e)
        finally:
            if len(file):
                os.remove(file)
        return data

    def create_backup_mysql(self):
        file = ''
        data = {}
        try:
            db = connection.settings_dict['NAME']
            db_name = '{}{}{}'.format("'", db, "'")
            db_pass = connection.settings_dict['PASSWORD']
            db_user = connection.settings_dict['USER']
            db_host = connection.settings_dict['HOST']
            data_now = '{0:%Y_%m_%d}'.format(datetime.now())
            name_backup = "{}_{}.sql".format('backup', data_now)
            # script = 'mysqldump -u {} -h {} -p{} --set-gtid-purged=OFF --no-tablespaces {} > {}'.format(db_user, db_host, db_pass, db_name, name_backup)
            script = 'mysqldump -u {} -h {} --set-gtid-purged=OFF --no-tablespaces {} > {}'.format(db_user, db_host, db_name, name_backup)
            print(BASE_DIR)
            subprocess.run(script, shell=True)
            file = os.path.join('/home/megacentroferretero/', name_backup)
            check = DatabaseBackups.objects.filter(fecha=datetime.now())
            if check:
                data['error'] = 'Ya existe un respaldo realizado el dia de hoy'
            else:
                db = DatabaseBackups()
                db.user = self.request.user
                db.archive.save(name_backup, File(open(file, 'rb')), save=False)
                db.save()
        except Exception as e:
            print('')
            print('')
            print('')
            print(12)
            print(e)
            data['error'] = str(e)
        finally:
            if len(file):
                os.remove(file)
        return data

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            if action == 'add':
                db_type = connection.vendor
                if db_type == 'sqlite':
                    data = self.create_backup_sqlite()
                elif db_type == 'postgresql':
                    data = self.create_backup_postgresql()
                elif db_type == 'mysql':
                    data = self.create_backup_mysql()
                else:
                    data['error'] = 'No se ha podido sacar el respaldo de la base de datos {}'.format(db_type)
            else:
                data['error'] = 'No ha seleccionado ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['crud'] = crud
        context['titulo'] = 'Nuevo registro de un Respaldo de Base de Datos'
        context['empresa'] = nombre_empresa()
        context['entidad'] = opc_entidad
        context['boton'] = 'Guardar respaldo de hoy'
        context['icono'] = opc_icono
        context['action'] = 'add'
        return context

class DatabaseBackupsDeleteView(ValidatePermissionRequiredMixin, DeleteView):
    model = DatabaseBackups
    template_name = 'front-end/databasebackups/backup_list.html'
    permission_required = 'delete_databasebackups'

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        data = {}
        try:
            self.get_object().delete()
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')


# @csrf_exempt
# def eliminar(request):
#     data = {}
#     try:
#         id = request.POST['id']
#         if id:
#             ps = DatabaseBackups.objects.get(pk=id)
#             ps.delete()
#             data['resp'] = True
#         else:
#             data['error'] = 'Ha ocurrido un error'
#     except Exception as e:
#         data['error'] = str(e)
#     return JsonResponse(data)
