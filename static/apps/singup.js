$(function () {
   validador();
    $.validator.addMethod("passwordcheck", function (value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
            && /[\[\]?*+|{}\\()@.\n\r]/.test(value)// has a special character
    }, "La contraseña debe contener de 8 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial");

    $('#singup').validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                maxlength: 50
            },
            first_name: {
                required: true,
                minlength: 3,
                maxlength: 50,
                lettersonly: true,
            },
            last_name: {
                required: true,
                minlength: 3,
                maxlength: 50,
                lettersonly: true,
            },
            cedula: {
                required: true,
                minlength: 10,
                maxlength: 10,
                digits: true,
                validar: true
            },
            email: {
                required: true,
                email: true
            },
            telefono: {
                required: false,
                minlength: 9,
                maxlength: 9,
                digits: true
            },
            celular: {
                required: true,
                minlength: 10,
                maxlength: 10,
                digits: true
            },
            direccion: {
                required: true,
                minlength: 5,
                maxlength: 50
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 20,
                passwordcheck: true
            },
            confirm_password: {
                required: true,
                minlength: 8,
                maxlength: 20,
                equalTo: "#id_password",
                passwordcheck: true
            }
        },
        messages: {
           username: {
                required: "Por favor ingresa un nombre de usuario",
                minlength: "Debe ingresar al menos tres letras"
            },
            first_name: {
                required: "Por favor ingresa un nombre",
                minlength: "Debe ingresar al menos tres letras",
                maxlength: "Debe ingresar maximo 50 letras",
                lettersonly: "Debe ingresar unicamente letras y espacios"
            },
            last_name: {
                required: "Por favor ingresa un apellido",
                minlength: "Debe ingresar al menos tres letras",
                maxlength: "Debe ingresar maximo 50 letras",
                lettersonly: "Debe ingresar unicamente letras y espacios"
            },
            cedula: {
                required: "Por favor ingresa tu numero de cedula",
                minlength: "Tu numero de documento debe tener al menos 10 digitos",
                digits: "Debe ingresar unicamente numeros",
                maxlength: "Tu numero de cedula debe tener maximo 10 digitos",
                validar: "Tu numero de cedula no es valido",
            },
            email: "Debe ingresar un correo valido",
            telefono: {
                minlength: "Tu numero de documento debe tener al menos 9 digitos",
                digits: "Debe ingresar unicamente numeros",
                maxlength: "Tu numero de documento debe tener maximo 9 digitos",
            },
            celular: {
                required: "Por favor ingresa tu numero celular",
                minlength: "Tu numero de documento debe tener al menos 10 digitos",
                digits: "Debe ingresar unicamente numeros",
                maxlength: "Tu numero de documento debe tener maximo 10 digitos",
            },
            direccion: {
                required: "Por favor ingresa una direccion",
                minlength: "Ingresa al menos 5 letras",
                maxlength: "Tu direccion debe tener maximo 50 caracteres",
            },
             password: {
                required: "Por favor ingresa una contraseña valida",
                minlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                maxlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
            },
            confirm_password: {
                required: "Las contraseñas deben coincidir",
                equalTo: "Las contraseñas deben coincidir",
                minlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                maxlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
            }
        }
    });
    $('#singup').on('submit', function (e) {
        e.preventDefault();
        var isvalid = $(this).valid();
        if (isvalid) {
            let obj = $.confirm({
                theme: 'supervan',
                icon: 'fa fa-spinner fa-spin',
                title: 'Estamos Trabajando!',
                content: 'Espera un momento mientras creamos tu usuario!',
                buttons: { ok: { isHidden: true}, cancel: { isHidden: true} }
            });
            var parametros = new FormData(this);
            $.ajax({
                dataType: 'JSON',
                type: 'POST',
                url: window.location.pathname,
                processData: false,
                contentType: false,
                data: parametros,
            }).done(function (data) {
                obj.close();
                if (!data.hasOwnProperty('error')) {
                    menssaje_ok('Genial!', 'Tu usuario fue creado correctamente', 'success', function () {
                        window.location.href = '/login'
                    });
                    return false;
                }
                menssaje_error_form('Error', data.error, 'fas fa-exclamation-circle');

            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + ': ' + errorThrown);
            });
        }
    });
});

