var datatable;
var logotipo;


function datatable_fun() {
    datatable = $("#datatable").DataTable({
        responsive: true,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
        },
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {'action': 'list'},
            dataSrc: ""
        },
        dom: "<'row'<'col-sm-12 col-md-12'B>>" +
            "<'row'<'col-sm-12 col-md-6'l>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        buttons: {
            dom: {
                button: {
                    className: 'float-md-right',

                },
                container: {
                    className: 'buttons-container'
                }
            },
            buttons: [
                {
                    className: 'btn btn-info btn-space',
                    text: '<i class="far fa-keyboard"></i> &nbsp;Tipo de Gasto</a>',
                    action: function (e, dt, node, config) {
                        window.location.href = '/tipo_gasto/lista'
                    }
                },
            ],
        },
        columns: [
            {"data": "fecha_pago"},
            {"data": "tipo_gasto.nombre"},
            {"data": "valor"},
            {"data": "detalle"},
            {"data": "id"}
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                render: function (data, type, row) {

                    var devolver = '<a type="button" rel="del" class="btn btn-danger btn-xs btn-round" ' +
                        'style="color: white" data-toggle="tooltip" title="Eliminar"><i class="fa fa-trash"></i></a>';
                    var editar = '<a type="button" rel="edit" class="btn btn-primary btn-xs btn-round" ' +
                        'style="color: white" data-toggle="tooltip" title="Editar"><i class="fa fa-edit"></i></a>' + ' ';
                    return editar + devolver;
                }
            },
            {
                targets: [2],
                class: 'text-center',
                render: function (data, type, row) {
                    return '$ ' + parseFloat(data).toFixed(2);
                }
            },
        ],
    });
}

$(function () {
    daterange();
    datatable_fun();
    $('#datatable tbody')
        .on('click', 'a[rel="del"]', function () {
            action = 'delete';
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var parametros = {'id': data.id};
            parametros['action'] = action;
            save_estado('Alerta',
                '/gasto/nuevo', 'Esta seguro que desea eliminar este gasto?', parametros,
                function () {
                    menssaje_ok('Exito!', 'Exito al eliminar este gasto!', 'far fa-smile-wink', function () {
                        datatable.ajax.reload(null, false)
                    })
                })
        })
        .on('click', 'a[rel="edit"]', function () {
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            $('input[name="fecha_pago"]').val(data.fecha_pago).attr('readonly', false).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                minYear: 1901,
                maxDate: new Date(),
                locale: {
                    format: 'YYYY-MM-DD',
                    applyLabel: '<i class="fas fa-search"></i> Aplicar',
                    cancelLabel: '<i class="fas fa-times"></i> Cancelar',
                },
            });
            $('input[name="valor"]').val(data.valor);
            $('textarea[name="detalle"]').val(data.detalle);
            $('select[name="tipo_gasto"]').val(data.tipo_gasto.id).trigger('change');
            mostrar();
            action = 'edit';
            pk = data.id;
        });
    //boton agregar cliente
    $('#nuevo').on('click', function () {
        reset('#form');
        mostrar();
        action = 'add';
        pk = '';
    });

    //enviar formulario de nuevo cliente
    $('#form').on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        parametros.append('action', action);
        parametros.append('id', pk);
        var isvalid = $(this).valid();
        if (isvalid) {
            save_with_ajax2('Alerta',
                '/gasto/nuevo', 'Esta seguro que desea guardar este gasto?', parametros,
                function (response) {
                    menssaje_ok('Exito!', 'Exito al guardar este gasto!', 'far fa-smile-wink', function () {
                        ocultar('#form');
                        $('input[name="fecha_pago"]').data('daterangepicker').remove();
                    });
                });
        }
    });

    $('#cancel_gasto').on('click', function () {
        $('#div_table').removeClass('col-xl-8 col-lg-12').addClass('col-xl-12');
        ocultar('#form');
        $('input[name="fecha_pago"]').data('daterangepicker').remove();
    });

    //nuevo tipo
    $('#id_new_tipo_gasto').on('click', function () {
        $('#Modal').modal('show');
        action = 'add';
    });

    //enviar formulario de nuevo tipo de gasto
    $('#form_tipo_gasto').on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        parametros.append('action', action);
        parametros.append('id', pk);
        var isvalid = $(this).valid();
        if (isvalid) {
            save_with_ajax2('Alerta',
                '/tipo_gasto/nuevo', 'Esta seguro que desea guardar este tipo de gasto?', parametros,
                function (response) {
                    menssaje_ok('Exito!', 'Exito al guardar este tipo de gasto!', 'far fa-smile-wink', function () {
                        $('#Modal').modal('hide');
                        var newOption = new Option(response.tipo_gasto['nombre'], response.tipo_gasto['id'], false, true);
                        $('#id_tipo_gasto').append(newOption).trigger('change');
                    });
                });
        }
    });
});


function daterange() {
    $('input[name="fecha"]').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: '<i class="fas fa-search"></i> Buscar',
            cancelLabel: '<i class="fas fa-times"></i> Cancelar',
        },
        maxDate: new Date(),
    }).on('apply.daterangepicker', function (ev, picker) {
        picker['key'] = 1;
        datos.add(picker);
        // filter_by_date();

    }).on('cancel.daterangepicker', function (ev, picker) {
        picker['key'] = 0;
        datos.add(picker);

    });

}
