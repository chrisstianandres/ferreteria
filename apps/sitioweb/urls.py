from django.contrib.auth.decorators import login_required
from django.urls import path

from apps.sitioweb.views import *

app_name = 'Sitio'

urlpatterns = [
    path('lista', login_required(lista.as_view()), name='lista'),
    path('configurar', login_required(CrudView.as_view()), name='configurar'),
    path('', sitio.as_view(), name=''),
    path('productos/catalogo', catalogo.as_view(), name='productos_catalogo'),
]
