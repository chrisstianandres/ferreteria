var logotipo;
var datatable;
var datatable_pagos;
var row_data;


function datatable_fun() {
    datatable = $("#datatable").DataTable({
        responsive: true,
        autoWidth: false,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {'action': 'list'},
            dataSrc: ""
        },
        columns: [
            {"data": "venta.cliente.full_name"},
            {"data": "nro_cuotas"},
            {"data": "valor"},
            {"data": "interes"},
            {"data": "tolal_deuda"},
            {"data": "saldo"},
            {"data": "estado_text"},
            {"data": "id"}
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
        },
        dom:
            "<'row'<'col-sm-12 col-md-3'l>>" +
            "<'row'<'col-sm-12 col-md-12'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        columnDefs: [
            {
                targets: '_all',
                class: 'text-center',
            },
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '<a style="color: white" type="button" class="btn btn-success btn-xs" rel="detalle" ' +
                        'data-toggle="tooltip" title="Detalle"><i class="fa fa-search"></i></a>' + ' '

                }
            },
            {
                targets: [-2],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var span;
                    if (row.estado === 2) {
                        span = '<span class="badge bg-success" style= "color: white">' + data + '</span>';
                    } else if (row.estado === 1) {
                        span = '<span class="badge bg-danger" style= "color: white">' + data + '</span>';
                    } else if (row.estado === 0) {
                        span = '<span class="badge bg-warning" style= "color: white">' + data + '</span>';
                    }
                    return span

                }
            },
        ]
    });
}

$(function () {
    var action = '';
    var pk = '';
    datatable_fun();
    $('#datatable tbody')
        .on('click', 'a[rel="detalle"]', function () {
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            row_data = data.id;
            $('#Modal').modal('show');
            datatable_pagos = $("#tbldetalle_ctas_cobrar").DataTable({
                responsive: true,
                autoWidth: false,
                language: {
                    "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                },
                destroy: true,
                ajax: {
                    url: window.location.pathname,
                    type: 'POST',
                    data: {
                        'id': data.id,
                        'action': 'detalle'
                    },
                    dataSrc: ""
                },
                columns: [
                    {data: 'fecha'},
                    {data: 'fecha_pago'},
                    {data: 'valor'},
                    {data: 'saldo'},
                    {data: 'estado_text'},
                    {data: 'id'},
                ],
                columnDefs: [
                    {
                        targets: '_all',
                        class: 'text-center'
                    },
                    {
                        targets: [-2],
                        orderable: false,
                        render: function (data, type, row) {
                            var span;
                            if (row.estado === 2) {
                                span = '<span class="badge bg-success" style="color:white">' + data + '</span>';
                            } else if (row.estado === 1) {
                                span = '<span class="badge bg-danger" style="color:white">' + data + '</span>';
                            } else if (row.estado === 0) {
                                span = '<span class="badge bg-warning" style="color:white">' + data + '</span>';
                            }
                            return span;

                        }
                    },
                    {
                        targets: [0],
                        orderable: false,
                        render: function (data, type, row) {
                            return row.fecha_venta === null ? '<span class="badge bg-warning" style="color:white">' + row.estado_text + '</span>': data;

                        }
                    },
                    {
                        targets: [-3],
                        orderable: false,
                        render: function (data, type, row) {
                            return '$' + parseFloat(data).toFixed(2);
                        }
                    },
                    {
                        targets: [-1],
                        width: "15%",
                        render: function (data, type, row) {
                            return row.estado===0|| row.estado===1 ?'<a type="button" rel="pagar" class="btn btn-success btn-xs btn-round" ' +
                                'style="color: white" data-toggle="tooltip" title="Realizar pago" >' +
                                '<i class="fas fa-hand-holding-usd"></i></a>' + ' ': '';
                        }
                    },
                ],
                createdRow: function (row, data, dataIndex) {

                },
            });
            if (data.estado === 1) {
                $('#abono').hide();
            } else {
                $('#abono').show();
            }
        });
    //boton agregar cliente
    $('#abono').on('click', function () {
        window.location.href = '/ctas_cobrar/pagar/' + row_data
    });
    $('#tbldetalle_ctas_cobrar tbody')
        .on('click', 'a[rel="pagar"]', function () {
            var tr = datatable_pagos.cell($(this).closest('td, li')).index();
            var data = datatable_pagos.row(tr.row).data();
            var parametros = {'id': data.id, 'action': 'pagar'};
            save_estado('Alerta',
                window.location.pathname, 'Esta seguro que desea realizar el pago de esta letra', parametros,
                function () {
                    menssaje_ok('Exito!', 'Exito al realizar el pago de esta letra', 'far fa-smile-wink', function () {
                        datatable_pagos.ajax.reload(null, false);
                        datatable.ajax.reload(null, false);
                    })
                });

        })
});
