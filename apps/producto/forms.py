from django import forms
from datetime import *

from django.contrib.auth.models import Group
from django.forms import SelectDateWidget, TextInput, NumberInput, EmailInput

from apps.producto.models import Producto
from apps.producto_base.models import Producto_base


class Producto_baseForm(forms.ModelForm):
    # constructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.fields:
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
            })
            self.fields['nombre'].widget = TextInput(
                attrs={'placeholder': 'Ingrese el nombre del producto', 'class': 'form-control',
                       'id': 'id_nombre_producto'})
            self.fields['descripcion'].widget = TextInput(
                attrs={'placeholder': 'Ingrese una descripcion del producto', 'class': 'form-control'})
            self.fields['categoria'].widget.attrs = {
                'class': 'form-control select2',
                'id': 'id_despcripcion_producto'}

    class Meta:
        model = Producto_base
        fields = ['nombre',
                  'descripcion',
                  'categoria'
                  ]
        labels = {
            'nombre': 'Nombre',
            'descripcion': 'Decripcion',
            'categoria': 'Categoria'
        }
        widgets = {
            'nombre': forms.TextInput(),
            'decripcion': forms.Textarea(attrs={'col': '3', 'row': '2'})
        }


class ProductoForm(forms.ModelForm):
    # constructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.fields:
            self.fields['pvp'].widget.attrs = {'class': 'form-control form-control-sm input-sm'}
            self.fields['pcp'].widget.attrs = {'class': 'form-control form-control-sm input-sm'}
            self.fields['pcp'].initial = 1.00
            self.fields['producto_base'].widget.attrs = {'class': 'form-control select2', 'style': "width: 89.5%"}
            self.fields['presentacion'].widget.attrs = {
                'class': 'form-control select2', 'style': "width: 89.5%", 'id': 'id_presentacion_producto'}

    class Meta:
        model = Producto
        fields = ['producto_base', 'pvp', 'pcp', 'presentacion', 'imagen']
        labels = {'producto_base': 'Producto', 'pvp': 'P.V.P.', 'pcp': 'P. Compra', 'presentacion': 'Presentacion',
                  'imagen': 'Imagen'}
        widgets = {'pvp': forms.TextInput(), 'pcp': forms.TextInput()}


class GroupForm(forms.ModelForm):
    # constructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.fields:
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
            })
            self.fields['name'].widget.attrs = {
                'class': 'form-control form-control-sm input-sm'}

    class Meta:
        model = Group
        fields = ['name', 'permissions']
        labels = {'name': 'Nombre', 'permissions': 'Permisos'}
        widgets = {'name': forms.TextInput(),
                   'permissions': forms.SelectMultiple(attrs={
                       'class': 'form-control c',
                       'style': 'width: 100%',
                       'multiple': 'multiple'
                   })}
