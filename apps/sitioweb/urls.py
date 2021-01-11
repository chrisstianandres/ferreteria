from django.conf.urls import url
from django.urls import path
from . import views
from apps.sitioweb.views import *
from django.contrib.auth.decorators import login_required
app_name = 'Sitio'

urlpatterns = [
    path('lista', login_required(lista.as_view()), name='lista'),
    path('configurar', login_required(CrudView.as_view()), name='configurar'),
    path('', views.sitio, name=''),
]
