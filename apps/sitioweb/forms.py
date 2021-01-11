from django import forms
from django.forms import TextInput, Textarea

from .models import SitioWeb


class SitiowebForm(forms.ModelForm):
    # constructor
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.Meta.fields:
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
            })

            self.fields['titulo'].widget = TextInput(
                attrs={'placeholder': 'Ingrese el titulo del sitio'})
            self.fields['mision'].widget = Textarea(
                attrs={'placeholder': 'Ingrese la mision de la empresa'})
            self.fields['vision'].widget = Textarea(
                attrs={'placeholder': 'Ingrese la vision de la empresa'})
            self.fields['mapa'].widget = Textarea(
                attrs={'placeholder': 'Copia y Pega un mapa de google'})
        # habilitar, desabilitar, y mas

    class Meta:
        model = SitioWeb
        fields = ['titulo', 'mision', 'vision', 'mapa'
                  ]
        labels = {
            'titulo': 'Titulo', 'mision': 'Mision', 'vision': 'Vision', 'mapa': 'Mapa'
        }
        widgets = {
            'titulo': forms.TextInput(),
            'mision': forms.Textarea(),
            'vision': forms.TextInput(),
            'mapa': forms.Textarea()
        }
