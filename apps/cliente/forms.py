from datetime import *

from django import forms
from django.forms import TextInput, EmailInput

from .models import Cliente


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

            self.fields['nombres'].widget = TextInput(
                attrs={'placeholder': 'Ingrese sus dos nombres'})
            self.fields['apellidos'].widget = TextInput(
                attrs={'placeholder': 'Ingrese sus dos Apellidos'})
            self.fields['cedula'].widget = TextInput(
                attrs={'placeholder': 'Ingrese un numero de cedula'})
            self.fields['correo'].widget = EmailInput(
                attrs={'placeholder': 'abc@correo.com'})
            self.fields['direccion'].widget = TextInput(
                attrs={'placeholder': 'Ingrese una direccion (Maximo 50 caracteres)'})
            self.fields['telefono'].widget = TextInput(
                attrs={'placeholder': 'Ingrese numero de telefono'})
            self.fields['celular'].widget = TextInput(
                attrs={'placeholder': 'Ingrese numero de telefono'})
        # habilitar, desabilitar, y mas

    class Meta:
        model = Cliente
        fields = ['nombres',
                  'apellidos',
                  'cedula',
                  'correo',
                  'sexo',
                  'telefono',
                  'celular',
                  'direccion'
                  ]
        labels = {
            'nombres': 'Nombres',
            'apellidos': 'Apellidos',
            'cedula': 'N° de cedula',
            'correo': 'Correo',
            'sexo': 'Genero',
            'telefono': 'Telefono',
            'celular': 'Celular',
            'Direccion': 'direccion'

        }
        widgets = {
            'nombres': forms.TextInput(),
            'apellidos': forms.TextInput(),
            'cedula': forms.TextInput(),
            'sexo': forms.Select(attrs={'class': 'selectpicker', 'data-width': 'fit'}),
            'correo': forms.EmailInput(),
            'telefono': forms.TextInput(),
            'celular': forms.TextInput(),
            'direccion': forms.TextInput()
        }
