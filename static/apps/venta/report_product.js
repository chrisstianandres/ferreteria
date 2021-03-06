var datos = {
    fechas: {
        'start_date': '',
        'end_date': '',
        'tipo': 0,
        'action': 'report',
        'id': ''
    },
    add: function (data) {
        if (data.key === 1) {
            this.fechas['start_date'] = data.startDate.format('YYYY-MM-DD');
            this.fechas['end_date'] = data.endDate.format('YYYY-MM-DD');
        } else if (data.key === 0) {
            this.fechas['start_date'] = data.start_date;
            this.fechas['end_date'] = data.end_date;
        } else if (data.key === 2) {
            this.fechas['start_date'] = '';
            this.fechas['end_date'] = '';
            this.fechas['id'] = data.id;
            this.fechas['action'] = 'producto';
        } else {
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
    daterange();
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
                    customize: customize_report,
                },
                {
                    text: '<i class="far fa-file-excel"></i> Excel</i>', className: "btn btn-success my_class",
                    extend: 'excel',
                    footer: true
                }
            ]
        },
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
                    return '$ ' + data;
                }
            },
        ],
        footerCallback: function (row, start, end, display) {
            var api = this.api();
            // Remove the formatting to get integer data for summation
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };
            // Total over this page
            pageTotalsiniva = api.column(5, {page: 'current'}).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            totaliva = api.column(5).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            pageTotaliva = api.column(6, {page: 'current'}).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            totalconiva = api.column(7).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            pageTotalconiva = api.column(7, {page: 'current'}).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);
            totalconiva = api.column(7).data().reduce(function (a, b) {
                return intVal(a) + intVal(b);
            }, 0);

            cantTotal = api
                .column(2, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            // Update footer
            $(api.column(5).footer()).html(
                '$' + parseFloat(pageTotalsiniva).toFixed(2) + '( $ ' + parseFloat(pageTotalsiniva).toFixed(2) + ')'
                // parseFloat(data).toFixed(2)
            );
            $(api.column(6).footer()).html(
                '$' + parseFloat(pageTotaliva).toFixed(2) + '( $ ' + parseFloat(pageTotaliva).toFixed(2) + ')'
                // parseFloat(data).toFixed(2)
            );
            $(api.column(7).footer()).html(
                '$' + parseFloat(pageTotalconiva).toFixed(2) + '( $ ' + parseFloat(pageTotalconiva).toFixed(2) + ')'
                // parseFloat(data).toFixed(2)
            );
            $(api.column(2).footer()).html(
                cantTotal
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

        } else if ($(this).val() === '2') {
            $('#year_seccion').hide();
            $('#producto_seccion').show();
            $('#range_date').hide();
        } else if ($(this).val() === '3') {
            $('#year_seccion').hide();
            $('#producto_seccion').hide();
            $('#range_date').hide();
        } else {
            $('#year_seccion').hide();
            $('#producto_seccion').hide();
            $('#range_date').show();
        }
    });
    $('#year1').on('change', function () {
        daterange()
    });
    $('#producto_id').on('change', function () {
        daterange()
    })
});

function daterange() {

    // $("div.toolbar").html('<br><div class="col-lg-3"><input type="text" name="fecha" class="form-control form-control-sm input-sm"></div> <br>');
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
            console.log(picker);
            datos.add(picker);
            // filter_by_date();

        })
        .on('cancel.daterangepicker', function (ev, picker) {
            picker['key'] = 1;
            datos.add(picker);
        });
    var picker = {};
    if ($('#search').val() === '0') {
        var year = $('#year1').val();
        picker['key'] = 0;
        picker['start_date'] = year + '-01-01';
        picker['end_date'] = year + '-12-31';
        datos.add(picker);
    } else if ($('#search').val() === '2') {
        var pic2 = {};
        pic2['key'] = 2;
        pic2['start_date'] = '';
        pic2['end_date'] = '';
        pic2['id'] = $('#producto_id').val();
        datos.add(pic2);
    } else {
        picker['key'] = 3;
        picker['start_date'] = '';
        picker['end_date'] = '';
        datos.add(picker);
    }
}
