"""ferreteria URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.urls import path, include

from apps import backEnd
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.sitioweb.urls', namespace='sitio')),
    path('menu', login_required(backEnd.menu), name='menu'),
    path('login/', backEnd.logeo, name='login'),
    # path('signin/', backEnd.signin.as_view(), name='signin'),
    path('accounts/login/', backEnd.logeo, name='login'),
    path('logout/', backEnd.disconnect, name='logout'),
    path('connect/', backEnd.connect, name='connect'),
    path('respaldos/', include('apps.DatabaseBackups.urls', namespace='database_backup')),
    path('empresa/', include('apps.empresa.urls', namespace='empresa')),
    path('ubicacion/', include('apps.ubicacion.urls', namespace='ubicacion')),
    path('proveedor/', include('apps.proveedor.urls', namespace='proveedor')),
    path('producto/', include('apps.producto.urls', namespace='producto')),
    path('presentacion/', include('apps.presentacion.urls', namespace='presentacion')),
    path('categoria/', include('apps.categoria.urls', namespace='categoria')),
    path('cliente/', include('apps.cliente.urls', namespace='cliente')),
    path('user/', include('apps.user.urls', namespace='user')),
    path('compra/', include('apps.compra.urls', namespace='compra')),
    path('venta/', include('apps.venta.urls', namespace='venta')),
    path('ctas_cobrar/', include('apps.cta_x_cbr.urls', namespace='ctas_cobrar')),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)\
                  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
