from datetime import *

from django import forms
from django.forms import TextInput, EmailInput

from .models import Cta_x_cobrar


class Cta_cobrarForm(forms.ModelForm):
    # constructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control'})
        # habilitar, desabilitar, y mas

    class Meta:
        model = Cta_x_cobrar
        fields = ['nro_cuotas', 'valor', 'interes', 'tolal_deuda']
        labels = {'nro_cuotas': 'N° Cuotas', 'valor': 'Valor a diferir', 'interes': 'Interes Generado',
                  'tolal_deuda': 'Total a pagar'}
        widgets = {
            'nro_cuotas': forms.TextInput()
        }
