var form_edit = $("#form_edit"), tabla = $('#div_table'), formulario = $('#div_form'), contrase = $('#div_contra');
var form_password = $("#form_password");
$(document).ready(function () {
    validador();
    $.validator.addMethod("passwordcheck", function (value) {
        return /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
            && /[\[\]?*+|{}\\()@.\n\r]/.test(value)// has a special character
    }, "La contraseña debe contener de 8 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial");
    $('#nuevo').on('click', function (e) {
        e.preventDefault();
        tabla.hide(1000);
        formulario.show(1000);

    });
    $('#reset').on('click', function (e) {
        e.preventDefault();
        tabla.hide(1000);
        contrase.show(1000);
    });


    form_edit.validate({
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
            avatar: {
                required: false
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
                digits: true
            },
            direccion: {
                required: true,
                minlength: 5,
                maxlength: 50
            }
        },
        messages: {
            username: {
                required: "Por favor ingresa un nombre de usuario",
                minlength: "Debe ingresar al menos tres letras"
            },
            first_name: {
                required: "Por favor ingresa tus nombres",
                minlength: "Debe ingresar al menos tres letras",
                lettersonly: "Debe ingresar unicamente letras y espacios"
            },
            last_name: {
                required: "Por favor ingresa tus apellidos",
                minlength: "Debe ingresar al menos tres letras",
                lettersonly: "Debe ingresar unicamente letras y espacios"
            },
            cedula: {
                required: "Por favor ingresa tu numero de cedula",
                minlength: "Tu numero de documento debe tener al menos 10 digitos",
                digits: "Debe ingresar unicamente numeros",
                maxlength: "Tu numero de documento debe tener maximo 10 digitos",
                val_ced: 'Cedula no valida para Ecuador'
            },
            email: "Debe ingresar un correo valido",
            telefono: {
                minlength: "Tu numero de documento debe tener al menos 9 digitos",
                maxlength: "Tu numero de documento debe tener al menos 9 digitos",
                digits: "Debe ingresar unicamente numeros",
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
        },
    });

    $("#form_edit input[type='text'], input[type='email'], select[name='sexo'], input[type='file']").on('change keyup', function () {
        $('#buttons_form_edit').fadeIn();
    });

    form_password.validate({
        rules: {
            old_password: {
                required: true,
                minlength: 3,
                maxlength: 50,
            },
            new_password1: {
                required: true,
                minlength: 8,
                maxlength: 20,
                passwordcheck: true
            },
            new_password2: {
                required: true,
                minlength: 8,
                maxlength: 20,
                equalTo: "#id_new_password1",
                passwordcheck: true
            }
        },
        messages: {
            old_password: {
                required: "Por favor ingresa tu contraseña anterior",
                minlength: "La contraseña debe contener de al menos 3 caracteres",
                maxlength: "La contraseña debe contener maximo 50 carácteres",
            },
            new_password1: {
                required: "Por favor ingresa una contraseña valida",
                minlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                maxlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
            },
            new_password2: {
                required: "Las contraseñas deben coincidir",
                equalTo: "Las contraseñas deben coincidir",
                minlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
                maxlength: "La contraseña debe contener de 5 a 20 carácteres alfanuméricos (a-z A-Z), contener mínimo un dígito (0-9) y un carácter especial",
            }
        },
    });

    $("#form_password input[type='password']").on('change keyup', function () {
        $('#buttons_form_password').fadeIn();
    });

    $('#id_first_name').keypress(function (e) {
        var changue = $(this).val().replace(/\b\w/g, function (l) {
            return l.toUpperCase()
        });
        $(this).val(changue);
        if (e.which >= 48 && e.which <= 57) {
            return false;
        }
    });
    $('#id_last_name').keypress(function (e) {
        var changue = $(this).val().replace(/\b\w/g, function (l) {
            return l.toUpperCase()
        });
        $(this).val(changue);
        if (e.which >= 48 && e.which <= 57) {
            return false;
        }
    });
    $('#id_cedula').keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Solo numeros").show().fadeOut("slow");
            return false;
        }
    });//Para solo numeros
    $('#id_telefono').keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Solo numeros").show().fadeOut("slow");
            return false;
        }
    });//Para solo numeros
    $('#id_celular').keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Solo numeros").show().fadeOut("slow");
            return false;
        }
    });//Para solo numeros
    $('#id_direccion').keypress(function (e) {
        var changue = $(this).val().replace(/\b\w/g, function (l) {
            return l.toUpperCase()
        });
        $(this).val(changue);
    });  //Para solo letras

    //enviar formulario
    $("#form_edit").on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        parametros.append('action', 'edit');
        var isvalid = $(this).valid();
        if (isvalid) {
            save_with_ajax2('Alerta',
                window.location.pathname, 'Esta seguro que desea editar la informacion de su perfil?', parametros,
                function (response) {
                    menssaje_ok('Exito!', 'Exito al actualizar tu informacion!', 'far fa-smile-wink', function () {
                        window.location.reload();
                    });
                });
        }
    });
    $("#form_password").on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        parametros.append('action', 'password');
        var isvalid = $(this).valid();
        if (isvalid) {
            save_with_ajax2('Alerta',
                window.location.pathname, 'Esta seguro que desea cambiar su contraseña?', parametros,
                function (response) {
                    menssaje_ok('Exito!', 'Exito al cambiar su contraseña!', 'far fa-smile-wink', function () {
                        window.location.reload();
                    });
                });
        }
    });

});
