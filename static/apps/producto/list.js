var logotipo;
var datatable;

function datatable_fun() {
    datatable = $("#datatable").DataTable({
        responsive: true,
        autoWidth: false,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
        },
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {'action': 'list'},
            dataSrc: ""
        },
        columns: [
            {"data": "producto_base.nombre"},
            {"data": "producto_base.categoria.nombre"},
            {"data": "producto_base.presentacion.nombre"},
            {"data": "producto_base.stock"},
            {"data": "producto_base.descripcion"},
            {"data": "pvp"},
            {"data": "imagen"},
            {"data": "id"}
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
                    text: '<i class="fa fa-file-pdf"></i> PDF',
                    className: 'btn btn-danger btn-space',
                    extend: 'pdfHtml5',
                    //filename: 'dt_custom_pdf',
                    orientation: 'landscape', //portrait
                    pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                    download: 'open',
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7],
                        search: 'applied',
                        order: 'applied'
                    },
                    customize,
                },
                {
                    text: '<i class="fa fa-file-excel"></i> Excel', className: "btn btn-success btn-space",
                    extend: 'excel'
                }
            ],
        },

        dom: "<'row'<'col-sm-12 col-md-12'B>>" +
            "<'row'<'col-sm-12 col-md-3'l>>" +
            "<'row'<'col-sm-12 col-md-12'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        columnDefs: [
            {
                targets: [-7],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '<span>' + data + '</span>';
                }
            },
            {
                targets: [-3, -4, -5],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '<span>$ ' + parseFloat(data).toFixed(2) + '</span>';
                }
            },
            {
                targets: '__all',
                class: 'text-center'
            },
            {
                targets: [-2],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    return '<img src="' + data + '" width="30" height="30" class="img-circle elevation-2" alt="User Image">';
                }
            },
            {
                targets: [-1],
                class: 'text-center',
                width: '10%',
                orderable: false,
                render: function (data, type, row) {
                    var edit = '<a style="color: white" type="button" class="btn btn-warning btn-xs" rel="edit" ' +
                        'data-toggle="tooltip" href="/producto/editar/' + data + '" title="Editar Datos"><i class="fa fa-edit"></i></a>' + ' ';
                    var del = '<a type="button" class="btn btn-danger btn-xs"  style="color: white" rel="del" ' +
                        'data-toggle="tooltip" title="Eliminar"><i class="fa fa-trash"></i></a>' + ' ';
                    return edit + del

                }
            },
        ],
        createdRow: function (row, data, dataIndex) {
            if (data.producto_base.stock >= 51) {
                $('td', row).eq(3).find('span').addClass('badge badge-success').attr("style", "color: white");
            } else if (data.producto_base.stock >= 10) {
                $('td', row).eq(3).find('span').addClass('badge badge-warning').attr("style", "color: white");
            } else if (data.producto_base.stock <= 9) {
                $('td', row).eq(3).find('span').addClass('badge badge-danger').attr("style", "color: white");
            }

        }

    });
}

$(function () {
    datatable_fun();

    $('#datatable tbody').on('click', 'a[rel="del"]', function () {
        var tr = datatable.cell($(this).closest('td, li')).index();
        var data = datatable.row(tr.row).data();
        var parametros = {'id': data.id, 'action': 'delete'};
        save_estado('Alerta',
            '/producto/nuevo', 'Esta seguro que desea eliminar este producto?', parametros,
            function () {
                menssaje_ok('Exito!', 'Exito al eliminar el producto!', 'far fa-smile-wink', function () {
                    datatable.ajax.reload(null, false);
                })
            });
    });

    $('#nuevo').on('click', function () {
        reset();
        mostrar();
        action = 'add';
        pk = '';

    })
});