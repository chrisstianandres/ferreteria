$(function () {
    validador();
    $.validator.addMethod("passwordcheck", function (value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
            && /[\[\]?*+|{}\\()@.\n\r]/.test(value)// has a special character
    }, "La contraseña debe contener de 8 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial");

    $('#reset_pass').validate({
        rules: {
            username: {
                required: true,
                minlength: 3,
                maxlength: 50
            }
        },
        messages: {
            username: {
                required: "Por favor ingresa un usuario valido",
                minlength: "Debe ingresar al menos 3 caracteres"
            }
        }
    });
    $('#reset_pass').on('submit', function (e) {
        e.preventDefault();
        var isvalid = $(this).valid();
        if (isvalid) {
            let obj = $.confirm({
                theme: 'supervan',
                icon: 'fa fa-spinner fa-spin',
                title: 'Estamos Trabajando!',
                content: 'Espera un momento mientras enviamos el correo!',
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
                    menssaje_ok('Genial!', 'El Correo de cambio de contrseña fue enviado a '+ data['email']+', revisa tu correo y ' +
                        'sigue las instrucciones para cambio de contraseña', 'success', function () {
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
    $('#form_change')
        .validate({
            rules: {
                password: {
                    required: true,
                    minlength: 8,
                    maxlength: 20,
                    passwordcheck: true
                },
                confirm_Password: {
                    required: true,
                    minlength: 8,
                    maxlength: 20,
                    equalTo: "#id_confirmPassword",
                    passwordcheck: true
                }
            },
            messages: {
                password: {
                    required: "Por favor ingresa una contraseña valida",
                    minlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                    maxlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                },
                confirmPassword: {
                    required: "Las contraseñas deben coincidir",
                    equalTo: "Las contraseñas deben coincidir",
                    minlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                    maxlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                }
            },
        });
    $('#form_change').on('submit', function (e) {
        e.preventDefault();
        var isvalid = $(this).valid();
        if (isvalid) {
             let obj = $.confirm({
                theme: 'supervan',
                icon: 'fa fa-spinner fa-spin',
                title: 'Estamos Trabajando!',
                content: 'Espera un momento mientras cambiamos tu contrseña!',
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
                    menssaje_ok('Exito!', 'La contrseña ha sido cambiada con exito, vuelve a inciar sesion', 'success', function () {
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

