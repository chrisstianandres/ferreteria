$(function () {
    var datatable = $("#datatable").DataTable({
        responsive: true,
        autoWidth: false,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
        },
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {'action': 'report'},
            dataSrc: ""
        },
        columns: [
            {"data": "producto_base.nombre"},
            {"data": "producto_base.categoria.nombre"},
            {"data": "presentacion.nombre"},
            {"data": "stock"},
            {"data": "producto_base.descripcion"},
            {"data": "pvp"},
            {"data": "pcp"},
            {"data": "imagen"},
        ],
        buttons: {
             dom: {
                button: {
                    className: '',

                },
                container: {
                    className: 'buttons-container float-md-right'
                }
            },
             buttons: [
            {
                text: '<i class="fa fa-file-pdf"></i> Reporte PDF',
                className: 'btn btn-danger btn-space',
                extend: 'pdfHtml5',
                //filename: 'dt_custom_pdf',
                orientation: 'landscape', //portrait
                pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                download: 'open',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6],
                    search: 'applied',
                    order: 'applied'
                },
                customize: customize_report,
            },
            {
                text: '<i class="fa fa-file-excel"></i> Reporte Excel', className: "btn btn-success btn-space",
                extend: 'excel'
            }
        ],
        },

       dom: "<'row'<'col-sm-12 col-md-12'B>>" +
            "<'row'<'col-sm-12 col-md-3'l>>" +
            "<'row'<'col-sm-12 col-md-12'f>>"+
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        columnDefs: [
            {
                targets: [3],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                targets: [-3, -2],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '<span>$ ' + parseFloat(data).toFixed(2)+'</span>';
                }
            },
            {
                targets: '__all',
                class: 'text-center'
            },
            {
                targets: [-1],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '<img src="' + data + '" width="30" height="30" class="img-circle elevation-2" alt="User Image">';
                }
            },
        ]
    });
});