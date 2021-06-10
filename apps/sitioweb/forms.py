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
                attrs={'placeholder': 'Ingrese el titulo del sitio', 'class': 'form-control'})
            self.fields['mision'].widget = Textarea(
                attrs={'placeholder': 'Ingrese la mision de la empresa', 'class': 'form-control'})
            self.fields['vision'].widget = Textarea(
                attrs={'placeholder': 'Ingrese la vision de la empresa', 'class': 'form-control'})
            self.fields['acerca'].widget = Textarea(
                attrs={'placeholder': 'Ingrese una descripcion acerca de la empresa (Maximo 500 caracteres)', 'class': 'form-control'})
            self.fields['coordenadas'].widget = Textarea(
                attrs={'placeholder': 'Copia y pega la direccion de la empresa en Google Maps, junto la etiquta iframe '
                                      'para que se muestre el mapa de la empresa', 'class': 'form-control'})
        # habilitar, desabilitar, y mas

    class Meta:
        model = SitioWeb
        fields = ['titulo', 'mision', 'vision', 'acerca', 'coordenadas'
                  ]
        labels = {
            'titulo': 'Titulo', 'mision': 'Mision', 'vision': 'Vision', 'acerca': 'Acerca de Nosotros',
            'coordenadas': 'Mapa de Google Maps'
        }
        widgets = {
            'titulo': forms.TextInput(),
            'mision': forms.Textarea(),
            'vision': forms.TextInput(),
            'acerca': forms.TextInput(),
            'coordenadas': forms.TextInput(),
        }
