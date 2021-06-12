from django.contrib.auth.decorators import login_required
from django.urls import path

from apps.empresa.views import editar

app_name = 'Empresa'

urlpatterns = [
    path('configuracion/', login_required(editar.as_view()), name='editar'),

]
