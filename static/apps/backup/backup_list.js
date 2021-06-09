var datatable;
$(function () {
    datatable = $("#datatable").DataTable({
        responsive: true,
        autoWidth: false,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
        },
        dom: "<'row'<'col-sm-12 col-md-12'B>>" +
            "<'row'<'col-sm-12 col-md-3'l>>" +
            "<'row'<'col-sm-12 col-md-12'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {'action': 'list'},
            dataSrc: ""
        },
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
                    text: 'Eliminar todos los respaldos <i class="fas fa-trash">',
                    className: 'btn btn-danger btn-sm',
                    attr: {id: 'delete_all'},
                    action: function (e, dt, node, config) {
                        delete_All();
                    }
                }]
        },
        columns: [
            {data: 'id'},
            {data: "fecha"},
            {data: "archive"},
            {data: "archive_path"}
        ],
        columnDefs: [
            {
                targets: '_all',
                class: 'text-center',
            },
            {
                targets: [-1],
                render: function (data, type, row) {
                    var descargar = '<a type="button" class="btn btn-success btn-xs" data-toggle="tooltip"\n' +
                        '                       title="Descargar"\n' +
                        '                       href="' + row.archive_path + '" download="' + row.archive + '.slq"><i class="fas fa-download"></i></a>' + ' ';
                    var eliminar = '<a type="button" rel="del" class="btn btn-danger btn-xs btn-round" ' +
                        'style="color: white" data-toggle="tooltip" title="Eliminar"><i class="fa fa-trash"></i></a>';
                    return descargar + eliminar;
                }
            },
        ]
    });
    $('#datatable tbody').on('click', 'a[rel="del"]', function () {
        var tr = datatable.cell($(this).closest('td, li')).index();
        var data = datatable.row(tr.row).data();
        var parametros = {'id': data.id};
        save_estado('Alerta',
            '/respaldos/eliminar', 'Esta seguro que desea eliminar este respaldo?', parametros,
            function () {
                menssaje_ok('Exito!', 'Exito al eliminar el respaldo!', 'far fa-smile-wink', function () {
                    datatable.ajax.reload(null, false);
                })
            });
    });

    function delete_All() {
        if (!datatable.data().any()) return false;
        var parametros = {'action': 'delete_access_all'};
        save_estado('Alerta',
            window.location.pathname, 'Esta seguro que desea eliminar todos los respaldos?', parametros,
            function () {
                menssaje_ok('Exito!', 'Exito al eliminar los respaldos!', 'far fa-smile-wink', function () {
                    datatable.ajax.reload(null, false);
                })
            });

    }

    $('#nuevo').on('click', function (e) {
        e.preventDefault();
        var parametros = {'action': 'add'};
        $.confirm({
            theme: 'supervan',
            type: 'red',
            icon: 'fas fa-exclamation-circle',
            title: 'Alerta!',
            content: 'Esta seguro que desea realizar un respaldo de base de datos?',
            columnClass: 'small',
            draggable: true,
            buttons: {
                si: {
                    text: '<i class="fas fa-check"></i> Si',
                    btnClass: 'btn-blue',
                    action: function () {
                        let obj = $.confirm({
                           icon: 'fa fa-spinner fa-spin',
                            title: 'Estamos Trabajando!',
                            content: 'Se esta creando el archivo de respaldo!',
                            buttons: { ok: { isHidden: true}, cancel: { isHidden: true}, }
                        });
                        $.ajax({
                            dataType: 'JSON',
                            type: 'POST',
                            url: '/respaldos/nuevo',
                            data: parametros,
                        }).done(function (data) {
                            if (!data.hasOwnProperty('error')) {
                                menssaje_ok('Exito!', 'Exito al al generar el respaldo de base de datos!', 'far fa-smile-wink', function () {
                                    obj.close();
                                    datatable.ajax.reload(null, false);
                                });
                                return false;
                            }
                            menssaje_error(data.error, data.content, 'fa fa-times-circle');
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                            alert(textStatus + ': ' + errorThrown);
                        });
                        //

                    }
                },
                no: {
                    text: '<i class="fas fa-times"></i> No',
                    btnClass: 'btn-red',
                    action: function () {
                    }
                }
            }
        });

    })


});
