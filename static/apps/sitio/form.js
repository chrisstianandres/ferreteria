$(document).ready(function () {
    $('#signupForm').on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        var isvalid = $(this).valid();
        if (isvalid) {
            save_with_ajax2('Alerta',
                window.location.pathname, 'Esta seguro que desea editar los parametros del sitio web?', parametros,
                function () {
                    menssaje_ok('Exito!', 'Exito al actulizar los parametros del sitio web!', 'far fa-smile-wink', function () {
                        window.location.href='/menu';
                    });
                });
        }
    })
});


