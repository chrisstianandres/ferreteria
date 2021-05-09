from datetime import *

from django import forms
from django.forms import TextInput, EmailInput

from .models import Cliente
from ..user.models import User


class ClienteForm(forms.ModelForm):
    # constructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        this_year = datetime.now().year
        years = range(this_year - 15, this_year - 3)
        for field in self.Meta.fields:
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
            })

            self.fields['first_name'].widget = TextInput(
                attrs={'placeholder': 'Ingrese sus dos nombres', 'class': 'form-control'})
            self.fields['last_name'].widget = TextInput(
                attrs={'placeholder': 'Ingrese sus dos Apellidos', 'class': 'form-control'})
            self.fields['cedula'].widget = TextInput(
                attrs={'placeholder': 'Ingrese un numero de cedula', 'class': 'form-control'})
            self.fields['email'].widget = EmailInput(
                attrs={'placeholder': 'abc@correo.com', 'class': 'form-control'})
            self.fields['direccion'].widget = TextInput(
                attrs={'placeholder': '(Maximo 50 caracteres)', 'class': 'form-control'})
            self.fields['telefono'].widget = TextInput(
                attrs={'placeholder': 'Ingrese numero de telefono', 'class': 'form-control'})
            self.fields['celular'].widget = TextInput(
                attrs={'placeholder': 'Ingrese numero de celular', 'class': 'form-control'})
        # habilitar, desabilitar, y mas

    class Meta:
        model = User
        fields = ['first_name',
                  'last_name',
                  'cedula',
                  'email',
                  'sexo',
                  'telefono',
                  'celular',
                  'direccion'
                  ]
        labels = {
            'first_name': 'Nombres',
            'last_name': 'Apellidos',
            'cedula': 'N° de cedula',
            'email': 'Correo',
            'sexo': 'Genero',
            'telefono': 'Telefono',
            'celular': 'Celular',
            'direccion': 'Direccion'

        }
        widgets = {
            'first_name': forms.TextInput(),
            'last_name': forms.TextInput(),
            'cedula': forms.TextInput(),
            'sexo': forms.Select(attrs={'class': 'selectpicker', 'data-width': 'fit'}),
            'email': forms.EmailInput(),
            'telefono': forms.TextInput(),
            'celular': forms.TextInput(),
            'direccion': forms.TextInput()
        }
