from django.conf.urls import url
from django.urls import path
from . import views
from apps.tipogasto.views import *
from django.contrib.auth.decorators import login_required
app_name = 'Tipo_Gasto'

urlpatterns = [
    path('lista', login_required(lista.as_view()), name='lista'),
    path('nuevo', login_required(CrudView.as_view()), name='nuevo'),
]
