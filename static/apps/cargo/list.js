var datatable, dt_detalle, action, url;
var datos = {
    items: {
        nombre: '',
        modelos: []
    },
    fechas: {
        'action': 'modelos'
    },
    add: function () {
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: this.fechas,
            success: function (data) {
                datos.items.modelos = data;
                listar();
            }
        });
    },
    add_new: function (id, nombre) {
        $('#nombre').val(nombre);
        var keys={'id': id, 'action': 'permisos'};
        $.ajax({
            url: window.location.pathname,
            type: 'POST',
            data: keys,
            success: function (data) {
                datos.items.modelos = data;
                listar_edit();
            }
        });
    }
};

function listar() {
    dt_nuevo = $("#tbldetalle").DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        language: {
            "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
        },

        data: datos.items.modelos,
        columns: [
            {data: 'nombre'},
            {data: 'view'},
            {data: 'add'},
            {data: 'change'},
            {data: 'delete'},
        ],
        columnDefs: [
            {
                targets: [-1],
                class: 'text-center',
                width: '10%',
                orderable: false,
                render: function (data, type, row) {
                    if (row.nombre === 'empresa' || row.nombre === 'devolucion' || row.nombre === 'inventario' || row.nombre === 'sitioweb' || row.nombre === 'reportes') {
                        return ''
                    } else {
                        return data === 0 ? '<input type="checkbox" name="eliminar">' : '<input type="checkbox" checked="checked" name="eliminar">';
                    }
                }
            },
            {
                targets: [-2],
                class: 'text-center',
                width: '10%',
                orderable: false,
                render: function (data, type, row) {
                    if (row.nombre === 'compra' || row.nombre === 'venta' || row.nombre === 'devolucion' || row.nombre === 'inventario' || row.nombre === 'reportes') {
                        return ''
                    } else {
                        return data === 0 ? '<input type="checkbox" name="editar">' : '<input type="checkbox" checked="checked" name="editar">';
                    }


                }
            },
            {
                targets: [-3],
                class: 'text-center',
                width: '10%',
                orderable: false,
                render: function (data, type, row) {
                    if (row.nombre === 'empresa' || row.nombre === 'inventario' || row.nombre === 'sitioweb' || row.nombre === 'reportes') {
                        return '';
                    } else {
                        return data === 0 ? '<input type="checkbox" name="agregar">' : '<input type="checkbox" checked="checked" name="agregar">';
                    }


                }
            },
            {
                targets: [-4],
                class: 'text-center',
                width: '10%',
                orderable: false,
                render: function (data, type, row) {
                    return data === 0 ? '<input type="checkbox" name="ver">' : '<input type="checkbox" checked="checked" name="ver">';

                }
            },
        ]
    });
}

function listar_edit() {
    dt_nuevo = $("#tbldetalle").DataTable({
                responsive: true,
                autoWidth: false,
                destroy: true,
                language: {
                    "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                },
                data: datos.items.modelos,
                columns: [
                    {data: 'nombre'},
                    {data: 'view'},
                    {data: 'add'},
                    {data: 'change'},
                    {data: 'delete'},
                ],
                columnDefs: [
                    {
                        targets: [-1],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            if (row.nombre === 'empresa' || row.nombre === 'devolucion' || row.nombre === 'inventario' || row.nombre === 'sitioweb' || row.nombre === 'reportes') {
                                return ''
                            } else {
                                return data === 0 ? '<input type="checkbox" name="eliminar">' : '<input type="checkbox" checked="checked" name="eliminar">';
                            }
                        }
                    },
                    {
                        targets: [-2],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            if (row.nombre === 'compra' || row.nombre === 'venta' || row.nombre === 'devolucion' || row.nombre === 'inventario' || row.nombre === 'reportes') {
                                return ''
                            } else {
                                return data === 0 ? '<input type="checkbox" name="editar">' : '<input type="checkbox" checked="checked" name="editar">';
                            }


                        }
                    },
                    {
                        targets: [-3],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            if (row.nombre === 'empresa' || row.nombre === 'inventario' || row.nombre === 'sitioweb' || row.nombre === 'reportes') {
                                return '';
                            } else {
                                return data === 0 ? '<input type="checkbox" name="agregar">' : '<input type="checkbox" checked="checked" name="agregar">';
                            }


                        }
                    },
                    {
                        targets: [-4],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            return data === 0 ? '<input type="checkbox" name="ver">' : '<input type="checkbox" checked="checked" name="ver">';

                        }
                    },
                ]
            });

}

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
            {"data": "id"},
            {"data": "nombre"},
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
                    var edit = '<a style="color: white" type="button" class="btn btn-primary btn-xs" rel="edit" ' +
                        'data-toggle="tooltip" title="Editar Datos"><i class="fa fa-edit"></i></a>' + ' ';
                    var del = '<a type="button" class="btn btn-danger btn-xs"  style="color: white" rel="del" ' +
                        'data-toggle="tooltip" title="Eliminar"><i class="fa fa-trash"></i></a>' + ' ';
                    var perms = '<a type="button" class="btn btn-success btn-xs"  style="color: white" rel="perms" ' +
                        'data-toggle="tooltip" title="Ver permisos"><i class="fa fa-user-lock"></i></a>' + ' ';
                    return perms + edit + del

                }
            },
        ],

    });
}

$(function () {
    datatable_fun();
    $('#datatable tbody')
        .on('click', 'a[rel="del"]', function () {
            action = 'delete';
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var parametros = {'id': data.id};
            parametros['action'] = action;
            save_estado('Alerta',
                '/grupos/eliminar/' + data.id + '/', 'Esta seguro que desea eliminar este grupo?', parametros,
                function () {
                    menssaje_ok('Exito!', 'Exito al eliminar este grupo!', 'far fa-smile-wink', function () {
                        datatable.ajax.reload(null, false)
                    })
                })
        })
        .on('click', 'a[rel="perms"]', function () {
            action = 'permisos';
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var parametros = {'id': data.id};
            parametros['action'] = action;
            $('#Modal').modal('show');
            dt_detalle = $("#tbldetalle").DataTable({
                responsive: true,
                autoWidth: false,
                destroy: true,
                language: {
                    "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
                },
                ajax: {
                    url: window.location.pathname,
                    type: 'POST',
                    data: {
                        'id': data.id,
                        'action': 'permisos'
                    },
                    dataSrc: ""
                },
                columns: [
                    {data: 'nombre'},
                    {data: 'view'},
                    {data: 'add'},
                    {data: 'change'},
                    {data: 'delete'},
                ],
                columnDefs: [
                    {
                        targets: [-1],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            if (row.nombre === 'empresa' || row.nombre === 'devolucion' || row.nombre === 'inventario' || row.nombre === 'sitioweb' || row.nombre === 'reportes') {
                                return ''
                            } else {
                                return data === 0 ? '<input type="checkbox" name="eliminar" disabled="disabled">' : '<input type="checkbox" checked="checked" name="eliminar" disabled="disabled">';
                            }
                        }
                    },
                    {
                        targets: [-2],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            if (row.nombre === 'compra' || row.nombre === 'venta' || row.nombre === 'devolucion' || row.nombre === 'inventario' || row.nombre === 'reportes') {
                                return ''
                            } else {
                                return data === 0 ? '<input type="checkbox" name="editar" disabled="disabled">' : '<input type="checkbox" checked="checked" name="editar" disabled="disabled">';
                            }


                        }
                    },
                    {
                        targets: [-3],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            if (row.nombre === 'empresa' || row.nombre === 'inventario' || row.nombre === 'sitioweb' || row.nombre === 'reportes') {
                                return '';
                            } else {
                                return data === 0 ? '<input type="checkbox" name="agregar" disabled="disabled">' : '<input type="checkbox" checked="checked" name="agregar" disabled="disabled">';
                            }


                        }
                    },
                    {
                        targets: [-4],
                        class: 'text-center',
                        width: '10%',
                        orderable: false,
                        render: function (data, type, row) {
                            return data === 0 ? '<input type="checkbox" name="ver" disabled="disabled">' : '<input type="checkbox" checked="checked" name="ver" disabled="disabled">';

                        }
                    },
                ]
            });
        })
        .on('click', 'a[rel="edit"]', function () {
            var tr = datatable.cell($(this).closest('td, li')).index();
            var data = datatable.row(tr.row).data();
            var parametros = {'id': data.id};
            parametros['action'] = 'edit';
            action = 'editar';
            $('#Modal').modal('show');
            datos.add_new(data.id, data.nombre);
            $('#footer_modal').show();
            $('#caja').show();
            url = '/grupos/editar/'+data.id+'/'
        });
    //boton agregar cliente
    $('#nuevo').on('click', function () {
        action = 'add';
        $('#Modal').modal('show');
        $('#footer_modal').show();
        $('#caja').show();
        datos.add();
        url = '/grupos/crear/';
    });

    //enviar formulario de nuevo cliente
    $('#save')
        .on('click', function (e) {
                e.preventDefault();
                var parametros;
                var nombre = $('#nombre').val();
                if (nombre === '') {
                    menssaje_error('Error', 'Debes ingresar un nombre al grupo', 'fa fa-times', function () {
                    });
                    return false;
                }

                datos.items.nombre = nombre;
                parametros = {'permisos': JSON.stringify(datos.items)};
                parametros['action'] = action;
                save_with_ajax('Alerta', url,
                    'Esta seguro que desea agregar este grupo', parametros, function () {
                        $('#Modal').modal('hide');
                        datatable.ajax.reload();

                    });
            }
        );
    $('#Modal').on('hidden.bs.modal', function () {
        $('#footer_modal').hide();
        $('#caja').hide();
        datos.items.nombre ='';
        datos.items.modelos =[];
        $('#nombre').val(null);
        url = '';
        action = '';
    });


    $('#tbldetalle tbody')
        .on('change', 'input[name="ver"]', function (e) {
            e.preventDefault();
            var ver = $(this).is(':checked') ? 1 : 0;
            var tr = dt_nuevo.cell($(this).closest('td, li')).index();
            datos.items.modelos[tr.row].view = ver;
        })
        .on('change', 'input[name="agregar"]', function (e) {
            e.preventDefault();
            var agregar = $(this).is(':checked') ? 1 : 0;
            var tr = dt_nuevo.cell($(this).closest('td, li')).index();
            datos.items.modelos[tr.row].add = agregar;
        })
        .on('change', 'input[name="editar"]', function (e) {
            e.preventDefault();
            var editar = $(this).is(':checked') ? 1 : 0;
            var tr = dt_nuevo.cell($(this).closest('td, li')).index();
            datos.items.modelos[tr.row].change = editar;
        })
        .on('change', 'input[name="eliminar"]', function (e) {
            e.preventDefault();
            var eliminar = $(this).is(':checked') ? 1 : 0;
            var tr = dt_nuevo.cell($(this).closest('td, li')).index();
            datos.items.modelos[tr.row].delete = eliminar;
        });
});
