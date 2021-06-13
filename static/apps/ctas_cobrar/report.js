var year = $('#year1').val();
var datos = {
    fechas: {
        'start_date': year + '-01-01',
        'end_date': year + '-12-31',
        'tipo': 0,
        'action': 'report',
        'id': ''
    },
    add: function (data) {
        if (data.key === 1) {
            this.fechas['action'] = 'report';
            this.fechas['start_date'] = data.startDate.format('YYYY-MM-DD');
            this.fechas['end_date'] = data.endDate.format('YYYY-MM-DD');
        } else if (data.key === 0) {
            this.fechas['action'] = 'report';
            this.fechas['start_date'] = data.start_date;
            this.fechas['end_date'] = data.end_date;
        } else if (data.key === 2) {
            this.fechas['start_date'] = '';
            this.fechas['end_date'] = '';
            this.fechas['id'] = data.id;
            this.fechas['action'] = 'cliente';
        } else {
            this.fechas['action'] = 'report';
            this.fechas['start_date'] = '';
            this.fechas['end_date'] = '';

        }
        let obj = $.confirm({
            icon: 'fa fa-spinner fa-spin',
            title: 'Un momento por favor!',
            content: 'Se esta cargando la informacion!',
            buttons: {ok: {isHidden: true}, cancel: {isHidden: true},}
        });
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: this.fechas,
            success: function (data) {
                datatable.clear();
                datatable.rows.add(data).draw();
                obj.close();
            }
        });

    },
};
$(function () {
    datatable = $("#datatable").DataTable({
        destroy: true,
        responsive: true,
        autoWidth: false,
        order: [[2, "asc"]],
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: datos.fechas,
            dataSrc: ""
        },
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
        },

        dom: "<'row'<'col-sm-12 col-md-12'B>>" +
            "<'row'<'col-sm-12 col-md-3'l>>" +
            "<'row'<'col-sm-12 col-md-12'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        buttons: {
            dom: {
                button: {
                    className: '',

                },
                container: {
                    className: 'buttons-container float-right'
                }
            },
            buttons: [
                {
                    text: '<i class="far fa-file-pdf"></i> PDF</i>',
                    className: 'btn btn-danger',
                    extend: 'pdfHtml5',
                    footer: true,
                    //filename: 'dt_custom_pdf',
                    orientation: 'landscape', //portrait
                    pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                    download: 'open',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7],
                        search: 'applied',
                        order: 'applied'
                    },
                    customize: customize_report
                },
                {
                    text: '<i class="far fa-file-excel"></i> Excel</i>', className: "btn btn-success my_class",
                    extend: 'excel',
                    footer: true
                }
            ]
        },
        columns: [
            {data: 'cta_cobrar.venta.cliente.full_name'},
            {data: "cta_cobrar.venta.fecha"},
            {data: "fecha"},
            {data: "fecha_pago"},
            {data: "valor"},
            {data: "valor_pagado"},
            {data: "saldo"},
            {data: "estado_text"}
        ],
        columnDefs: [
            {
                targets: '_all',
                class: 'text-center',

            },
            {
                targets: [-2, -3, -4],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '$' + parseFloat(data).toFixed(2);
                }
            },
            {
                targets: [-1],
                width: '20%',
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
            }
        ],
        footerCallback: function (row, start, end, display) {
            var api = this.api();
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            // Total over this page
            pageTotalsiniva = api.column(4, {page: 'current'}).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            totaliva = api.column(4).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            pageTotaliva = api.column(5, {page: 'current'}).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            totalconiva = api.column(5).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            pageTotalconiva = api.column(6, {page: 'current'}).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            totalconiva = api.column(6).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            // Update footer
            $(api.column(4).footer()).html(
                '$' + parseFloat(pageTotalsiniva).toFixed(2) + '( $ ' + parseFloat(pageTotalsiniva).toFixed(2) + ')'
                // parseFloat(data).toFixed(2)
            );
            $(api.column(5).footer()).html(
                '$' + parseFloat(pageTotaliva).toFixed(2) + '( $ ' + parseFloat(pageTotaliva).toFixed(2) + ')'
                // parseFloat(data).toFixed(2)
            );
            $(api.column(6).footer()).html(
                '$' + parseFloat(pageTotalconiva).toFixed(2) + '( $ ' + parseFloat(pageTotalconiva).toFixed(2) + ')'
                // parseFloat(data).toFixed(2)
            );
        },

    });
    $('#search').on('change', function () {
        daterange();
        if ($(this).val() === '0') {
            $('#year_seccion').show();
            $('#range_date').hide();
            $('#producto_seccion').hide();

        } else if ($(this).val() === '1') {
            $('#year_seccion').hide();
            $('#producto_seccion').hide();
            $('#range_date').show();
        } else if ($(this).val() === '2') {
            $('#year_seccion').hide();
            $('#producto_seccion').show();
            $('#range_date').hide();
        } else {
            $('#year_seccion').hide();
            $('#producto_seccion').hide();
            $('#range_date').hide();
        }
    });
    $('#year1').on('change', function () {
        daterange()
    });
    $('#cliente_id').on('change', function () {
        daterange()
    });
    $('#fecha').on('apply.daterangepicker', function (ev, picker) {
        picker['key'] = 1;
        datos.add(picker);
    });
});

function daterange() {
    $('input[name="fecha"]').daterangepicker({
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: '<i class="fas fa-search"></i> Buscar',
            cancelLabel: '<i class="fas fa-times"></i> Cancelar',
        },
        showDropdowns: true,
    })
        .on('apply.daterangepicker', function (ev, picker) {
            picker['key'] = 1;
            datos.add(picker);
            // filter_by_date();

        })
        .on('cancel.daterangepicker', function (ev, picker) {
            picker['key'] = 1;
            datos.add(picker);
        });
    var picker = {};
    var search = $('#search').val();
    if (search === '0') {
        var year = $('#year1').val();
        picker['key'] = 0;
        picker['start_date'] = year + '-01-01';
        picker['end_date'] = year + '-12-31';
        datos.add(picker);
    }
    else if (search === '2') {
        picker['key'] = 2;
        picker['start_date'] = '';
        picker['end_date'] = '';
        picker['id'] = $('#cliente_id').val();
        datos.add(picker);
    }
    else {
       picker['key'] = 3;
       picker['start_date'] = '';
       picker['end_date'] = '';
       datos.add(picker);
    }
}
