var datatable;
var user_tipo = $('input[name="user_tipo"]').val();
var logotipo;

function datatable_fun() {
    datatable = $("#datatable").DataTable({
        responsive: true,
        destroy: true,
        scrollX: true,
        autoWidth: false,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data:{'action': 'list'},
            dataSrc: ""
        },
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
        },
        order: [[6, "desc"]],
        dom:
            "<'row'<'col-sm-12 col-md-3'l>>" +
            "<'row'<'col-sm-12 col-md-12'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        columns: [
            {data: 'fecha'},
            {data: "cliente.full_name"},
            {data: "subtotal"},
            {data: "iva"},
            {data: "total"},
            {data: "id"},
            {data: "estado_display"},
            {data: "id"},
        ],
        columnDefs: [
            {
                targets: '_all',
                class: 'text-center',

            },
            {
                targets: [-4, -5, -6],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '$' + parseFloat(data).toFixed(2);
                }
            },
            {
                targets: [-2],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    console.log(row);
                    var span = '';
                    if (row.estado === 1) {
                        span +='<span class="badge bg-success" style="color: white">' + data + '</span> '+' ';
                    } else if (row.estado === 0) {
                        span +='<span class="badge bg-danger" style="color: white">' + data + '</span> '+' ';
                    } else if (row.estado === 2) {
                         span +='<span class="badge bg-warning" style="color: white">' + data + '</span> '+' ';
                    }
                    span +='<span class="badge bg-info" style="color: white">' + row.tipo_venta + '</span> '+' ';
                    span +='<span class="badge bg-secondary" style="color: white">' + row.tipo_pago + '</span> '+' ';
                    return span;
                }
            },
            {
                targets: [-1],
                class: 'text-center',
                width: "15%",
                render: function (data, type, row) {
                    var detalle = '<a type="button" rel="detalle" class="btn btn-success btn-xs btn-round" ' +
                        'style="color: white" data-toggle="tooltip" title="Detalle de Productos" >' +
                        '<i class="fa fa-search"></i></a>' + ' ';
                    var pagar = row.estado === 2 && user_tipo === '1' ? '<a type="button" rel="pagar" class="btn btn-warning btn-xs btn-round" ' +
                        'style="color: white" data-toggle="tooltip" title="Realizar pago" >' +
                        '<i class="fas fa-hand-holding-usd"></i></a>' : ' ';
                    var devolver = row.estado === 2 || row.estado === 1 && user_tipo === '1' ? '<a type="button" rel="devolver" class="btn btn-danger btn-xs btn-round" ' +
                        'style="color: white" data-toggle="tooltip" title="Devolver"><i class="fa fa-times"></i></a>' + ' ' : '';
                    var pdf = row.estado === 2 || row.estado === 1 ? '<a type="button" href= "/venta/printpdf/' + data + '" rel="pdf" ' +
                        'class="btn btn-primary btn-xs btn-round" style="color: white" data-toggle="tooltip" ' +
                        'title="Reporte PDF"><i class="fa fa-file-pdf"></i></a>' : ' ';
                    return pagar + ' ' + detalle + devolver + pdf;
                }
            },
            {
                targets: [-3],
                render: function (data, type, row) {
                    return pad(data, 10);
                }
            }

        ]
    });
}

function daterange() {
    $("div.toolbar").html('<br><div class="col-lg-3"><input type="text" name="fecha" class="form-control form-control-sm input-sm"></div> <br>');
    $('input[name="fecha"]').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: '<i class="fas fa-search"></i> Buscar',
            cancelLabel: '<i class="fas fa-times"></i> Cancelar',
        }
    }).on('apply.daterangepicker', function (ev, picker) {
        picker['key'] = 1;
        datos.add(picker);
        // filter_by_date();

    }).on('cancel.daterangepicker', function (ev, picker) {
        picker['key'] = 0;
        datos.add(picker);
    });

}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}


$(function () {
    daterange();
    datatable_fun();

    $('#datatable tbody')
        .on('click', 'a[rel="devolver"]', function () {
            $('.tooltip').remove();
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var parametros = {'id': data.id, 'action': 'estado'};
            save_estado('Alerta',
                window.location.pathname, 'Esta seguro que desea devolver esta venta?', parametros,
                function () {
                    menssaje_ok('Exito!', 'Exito al devolver la venta', 'far fa-smile-wink', function () {
                        datatable.ajax.reload(null, false);
                    })
                });

        })
        .on('click', 'a[rel="pagar"]', function () {
            $('.tooltip').remove();
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var parametros = {'id': data.id, 'action': 'pagar'};
            save_estado('Alerta',
                window.location.pathname, 'Esta seguro que desea realizar el pago de esta venta de $ <strong>' + data.transaccion.total + '</strong>?', parametros,
                function () {
                    menssaje_ok('Exito!', 'Exito al realizar el pago de esta venta', 'far fa-smile-wink', function () {
                        datatable.ajax.reload(null, false);
                    })
                });

        })
        .on('click', 'a[rel="borrar"]', function () {
            $('.tooltip').remove();
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var parametros = {'id': data.id};
            save_estado('Alerta',
                '/venta/eliminar', 'Esta seguro que desea eliminar esta venta?', parametros,
                function () {
                    menssaje_ok('Exito!', 'Exito al Eliminar la venta', 'far fa-smile-wink')
                });
        })
        .on('click', 'a[rel="detalle"]', function () {
            $('.tooltip').remove();
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var resp = {};
            $('#Modal').modal('show');
            $("#tbldetalle_productos").DataTable({
                responsive: true,
                autoWidth: false,
                language: {
                    "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                },
                destroy: true,
                ajax: {
                    url: window.location.pathname,
                    type: 'Post',
                    data: {
                        'id': data.id,
                        'action': 'detalle'
                    },
                    dataSrc: ""
                },
                columns: [
                    {data: 'producto'},
                    {data: 'categoria'},
                    {data: 'presentacion'},
                    {data: 'cantidad'},
                    {data: 'pvp'},
                    {data: 'subtotal'}
                ],
                columnDefs: [
                    {
                        targets: '_all',
                        class: 'text-center'
                    },

                    {
                        targets: [-1, -2],
                        class: 'text-center',
                        orderable: false,
                        render: function (data, type, row) {
                            return '$' + parseFloat(data).toFixed(2);
                        }
                    },
                ],
                footerCallback: function (row, data, start, end, display) {
                    var api = this.api(), data;

                    // Remove the formatting to get integer data for summation
                    var intVal = function (i) {
                        return typeof i === 'string' ?
                            i.replace(/[\$,]/g, '') * 1 :
                            typeof i === 'number' ?
                                i : 0;
                    };
                    // Total over this page
                    pageTotal = api
                        .column(3, {page: 'current'})
                        .data()
                        .reduce(function (a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);

                    // Update footer
                    $(api.column(3).footer()).html(
                        '$' + parseFloat(pageTotal).toFixed(2)
                        // parseFloat(data).toFixed(2)
                    );
                },
            });
        });

    $('#nuevo').on('click', function () {
        if (user_tipo === '0') {
            window.location.href = '/productos/catalogo'
        } else {
            window.location.href = '/venta/nuevo'
        }


    })
});



