var datos = {
    fechas: {
        'start_date': '',
        'end_date': '',
        'tipo': 0,
        'action': 'report'
    },
    add: function (data) {
        if (data.key === 1) {
            this.fechas['start_date'] = data.startDate.format('YYYY-MM-DD');
            this.fechas['end_date'] = data.endDate.format('YYYY-MM-DD');
        } else {
            this.fechas['start_date'] = '';
            this.fechas['end_date'] = '';
        }

        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: this.fechas,
            success: function (data) {
                datatable.clear();
                datatable.rows.add(data).draw();
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
        order: [[ 2, "asc" ]],
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
            "<'row'<'col-sm-12 col-md-12'f>>"+
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
                    columns: [0, 1, 2, 3, 4, 5, 6],
                    search: 'applied',
                    order: 'applied'
                },
                customize: customize
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
            pageTotalsiniva = api
                .column(4, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            totaliva = api.column( 4 ).data().reduce( function (a, b) {
                         return intVal(a) + intVal(b);
                         }, 0 );
            pageTotaliva = api
                .column(5, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            totalconiva = api.column( 6 ).data().reduce( function (a, b) {
                         return intVal(a) + intVal(b);
                         }, 0 );
            pageTotalconiva = api
                .column(6, {page: 'current'})
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);
            totalconiva = api.column( 6 ).data().reduce( function (a, b) {
                         return intVal(a) + intVal(b);
                         }, 0 );

            cantTotal = api
                .column(2, {page: 'current'})
                .data()
                .reduce(function (a, b) {
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
            $(api.column(2).footer()).html(
                cantTotal
                // parseFloat(data).toFixed(2)
            );
        },

    });
});

function daterange() {
    // $("div.toolbar").html('<br><div class="col-lg-3"><input type="text" name="fecha" class="form-control form-control-sm input-sm"></div> <br>');
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
