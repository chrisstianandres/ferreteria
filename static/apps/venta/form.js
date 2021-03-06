var tblventa;
var ventas = {
    items: {
        fecha_venta: '',
        cliente: '',
        subtotal: 0.00,
        forma_pago: 0,
        nro_cuotas: 0,
        letra: 0.00,
        tolal_deuda: 0.00,
        interes: 0.00,
        iva: 0.00,
        iva_emp: 0.00,
        total: 0.00,
        productos: [],
    },
    get_ids: function () {
        var ids = [];
        $.each(this.items.productos, function (key, value) {
            ids.push(value.id);
        });
        return ids;
    },
    calculate: function () {
        var subtotal = 0.00;
        var iva_emp = 0.00;
        $.each(this.items.productos, function (pos, dict) {
            dict.subtotal = dict.cantidad * parseFloat(dict.pvp);
            subtotal += dict.subtotal;
            iva_emp = (dict.iva_emp / 100);
        });
        this.items.subtotal = subtotal;
        this.items.iva = this.items.subtotal * iva_emp;
        this.items.total = this.items.subtotal + this.items.iva;
        $('input[name="subtotal"]').val(this.items.subtotal.toFixed(2));
        $('input[name="iva"]').val(this.items.iva.toFixed(2));
        $('input[name="total"]').val(this.items.total.toFixed(2));
    },
    add: function (data) {
        this.items.productos.push(data);
        this.list();
    },
    list: function () {
        this.calculate();
        tblventa = $("#datatable").DataTable({
            destroy: true,
            autoWidth: false,
            dataSrc: "",
            responsive: true,
            language: {
                "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
            },
            data: this.items.productos,
            columns: [
                {data: 'id'},
                {data: "producto_base.nombre"},
                {data: "producto_base.categoria.nombre"},
                {data: "presentacion.nombre"},
                {data: "imagen"},
                {data: "stock"},
                {data: "cantidad"},
                {data: "pvp"},
                {data: "subtotal"}
            ],
            columnDefs: [
                {
                    targets: [0],
                    class: 'text-center',
                    width: '5%',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<a rel="remove" type="button" class="btn btn-danger btn-xs btn-flat rounded-pill" style="color: white" data-toggle="tooltip" title="Quitar Producto"><i class="fa fa-times"></i></a>';
                        //return '<a rel="remove" class="btn btn-danger btn-sm btn-flat"><i class="fas fa-trash-alt"></i></a>';

                    }
                },
                {
                    targets: [-1, -2],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '$' + parseFloat(data).toFixed(2);
                    }
                },
                {
                    targets: [-5],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<img src="' + data + '" width="30" height="30" class="img-circle elevation-2" alt="">';
                    }
                },
                {
                    targets: [-3],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<input type="text" name="cantidad" class="form-control form-control-sm input-sm" autocomplete="off" value="' + data + '">';

                    }
                }
            ], rowCallback: function (row, data) {
                $(row).find('input[name="cantidad"]').TouchSpin({
                    min: 1,
                    max: data.stock,
                    step: 1
                });
            }
        });
    },
};
$(function () {
    if (localStorage.getItem('carrito')) {
        carro_respaldo = JSON.parse(localStorage.getItem('carrito'));
        ventas.items.productos = carro_respaldo;
        ventas.list();
    } else {
        ventas.list();
    }
    var action = '';
    var pk = '';
    //remover producto del detalle
    $('#datatable tbody')
        .on('click', 'a[rel="remove"]', function () {
            var tr = tblventa.cell($(this).closest('td, li')).index();
            borrar_todo_alert('Alerta de Eliminación',
                'Esta seguro que desea eliminar este producto de tu detalle <br> ' +
                '<strong>CONTINUAR?</strong>', function () {
                    ventas.items.productos.splice(tr.row, 1);
                    ventas.list();
                })
        })
        .on('change keyup', 'input[name="cantidad"]', function () {
            var cantidad = parseInt($(this).val());
            var tr = tblventa.cell($(this).closest('td, li')).index();
            ventas.items.productos[tr.row].cantidad = cantidad;
            ventas.calculate();
            $('td:eq(8)', tblventa.row(tr.row).node()).html('$' + ventas.items.productos[tr.row].subtotal.toFixed(2));
        })
    .on('click', '.img-circle', function () {
            var tr = tblventa.cell($(this).closest('td, li')).index();
            var data = tblventa.row(tr.row).data();
            $('#Modal_imagen').modal('show');
            $('#img_prod').html('<img src="' + data.imagen + '" width="100%" height="100%" class="img-circle elevation-2" alt="" rel="imagen">');
        });
    //remover todos los productos del detalle
    $('.btnRemoveall').on('click', function () {
        if (ventas.items.productos.length === 0) return false;
        borrar_todo_alert('Alerta de Eliminación',
            'Esta seguro que desea eliminar todos los productos seleccionados? <br>' +
            '<strong>CONTINUAR?</strong>', function () {
                ventas.items.productos = [];
                ventas.list();
            });
    });
    //boton guardar
    $('#save').on('click', function () {
        if (ventas.items.productos.length === 0) {
            menssaje_error('Error!', "Debe seleccionar al menos un producto", 'far fa-times-circle');
            return false
        } else {
            var total_venta = $('#id_total').val();
            $('#Modal_detalle').modal('show');
            $('#id_valor').val(total_venta);
            if (total_venta <= 1) {
                $('#id_tipo_pago').prop('disabled', true).val(0).trigger('change');
                $('#select2-id_tipo_pago-container').attr('title', 'El valor debe ser mayor a $ 1000 para ' +
                    'realizar un pago a credito');
                $('#credito').hide();
                amortizacion($('#id_nro_cuotas').val(0), ($('#tasa_val').val() / 100), $('#id_total').val());
            } else {
                $('#id_tipo_pago').prop('disabled', false);
            }
        }
    });
    $('#facturar').on('click', function () {
            if ($('select[name="cliente"]').val() === "") {
                menssaje_error('Error!', "Debe seleccionar un cliente", 'far fa-times-circle');
                return false
            }
            var parametros;
            ventas.items.fecha_venta = $('input[name="fecha"]').val();
            ventas.items.cliente = $('#id_cliente option:selected').val();
            ventas.items.letra = $('#id_letra').val();
            ventas.items.interes = $('#id_interes').val();
            ventas.items.total_deuda = $('#id_tolal_deuda').val();
            ventas.items.forma_pago = $('#id_tipo_pago option:selected').val();
            ventas.items.nro_cuotas = $('#id_nro_cuotas').val();
            parametros = {'ventas': JSON.stringify(ventas.items)};
            parametros['action'] = 'add';
            parametros['id'] = '';
            save_with_ajax('Alerta',
                '/venta/nuevo', 'Esta seguro que desea guardar esta venta?', parametros,
                function (response) {
                    localStorage.clear();
                    printpdf('Alerta!', '¿Desea generar el comprobante en PDF?', function () {
                        window.open('/venta/printpdf/' + response['id'], '_blank');
                        // location.href = '/venta/printpdf/' + response['id'];
                        location.href = '/venta/lista';
                    }, function () {
                        location.href = '/venta/lista';
                    })

                });
        }
    );
    //boton agregar cliente
    $('#id_new_cliente').on('click', function () {
        $('#Modal_person').modal('show');
    });
    //enviar formulario de nuevo cliente
    $('#form_person').on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        parametros.append('action', 'add');
        parametros.append('id', '');
        var isvalid = $(this).valid();
        if (isvalid) {
            save_with_ajax2('Alerta',
                '/cliente/nuevo', 'Esta seguro que desea guardar este cliente?', parametros,
                function (response) {
                    menssaje_ok('Exito!', 'Exito al guardar este cliente!', 'far fa-smile-wink', function () {
                        $('#Modal_person').modal('hide');
                        var newOption = new Option(response.cliente['full_name'], response.cliente['id'], false, true);
                        $('#id_cliente').append(newOption).trigger('change');
                    });
                });
        }

    });
    //buscar cliente en el select cliente
    $('#id_cliente')
        .select2({
            theme: "classic",
            language: {
                inputTooShort: function () {
                    return "Ingresa al menos un caracter...";
                },
                "noResults": function () {
                    return "Sin resultados";
                },
                "searching": function () {
                    return "Buscando...";
                }
            },
            allowClear: true,
            ajax: {
                delay: 250,
                type: 'POST',
                url: window.location.pathname,
                data: function (params) {
                    return {
                        term: params.term,
                        'action': 'search_cli'
                    };
                },
                processResults: function (data) {
                    return {
                        results: data
                    };

                },

            },
            placeholder: 'Busca un cliente',
            minimumInputLength: 1,
        });
    //mostrar el modal con el formulario cliente
    $('#Modal_person').on('hidden.bs.modal', function (e) {
        reset('#form_person');
        $('#form_person').trigger("reset");
    });

    //buscar produto del select producto
    $('#id_producto')
        .select2({
            theme: "classic",
            language: {
                inputTooShort: function () {
                    return "Ingresa al menos un caracter...";
                },
                "noResults": function () {
                    return "Sin resultados";
                },
                "searching": function () {
                    return "Buscando...";
                }
            },
            allowClear: true,
            ajax: {
                delay: 250,
                type: 'POST',
                url: window.location.pathname,
                data: function (params) {
                    return {
                        term: params.term,
                        'action': 'search',
                        'id': '',
                        'ids': JSON.stringify(ventas.get_ids())
                    };
                },
                processResults: function (data) {
                    return {
                        results: data
                    };

                },

            },
            placeholder: 'Busca un Producto',
            minimumInputLength: 1,
        })
        .on('select2:select', function (e) {
            $.ajax({
                type: "POST",
                url: window.location.pathname,
                data: {
                    "id": $('#id_producto option:selected').val(),
                    'action': 'get'
                },
                dataType: 'json',
                success: function (data) {
                    ventas.add(data[0]);
                    $('#id_producto').val(null).trigger('change');
                },
                error: function (xhr, status, data) {
                    alert(data);
                },

            })
        });

    $('#id_search_table').on('click', function () {
        $('#Modal_search').modal('show');
        tbl_productos = $("#tbl_productos").DataTable({
            destroy: true,
            autoWidth: false,
            dataSrc: "",
            responsive: true,
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {'action': 'list_list', 'ids': JSON.stringify(ventas.get_ids())},
                dataSrc: ""
            },
            language: {
                "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
            },
            columns: [
                {data: "producto_base.nombre"},
                {data: "producto_base.categoria.nombre"},
                {data: "presentacion.nombre"},
                {data: "stock"},
                {data: "producto_base.descripcion"},
                {data: "pvp"},
                {data: "pcp"},
                {data: "imagen"},
                {data: "id"}
            ],
            columnDefs: [
                {
                    targets: [-3, -4],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '$' + parseFloat(data).toFixed(2);
                    }
                },
                {
                    targets: [3],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<span class="badge badge-primary">' + data + '</span>';
                    }
                },
                {
                    targets: [-2],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<img src="' + data + '" width="30" height="30" class="img-circle elevation-2" rel="" alt="foto">';
                    }
                },
                {
                    targets: [-1],
                    class: 'text-center',
                    width: '10%',
                    orderable: false,
                    render: function (data, type, row) {
                        return row.stock > 1 ? '<a style="color: white" type="button" class="btn btn-success btn-xs" rel="take" ' +
                            'data-toggle="tooltip" title="Seleccionar Producto"><i class="fa fa-check"></i></a>' : ' ';

                    }
                },
            ],
            rowCallback: function (row, data) {
                if (data.stock === 0) {
                    $('td', row).css('background-color', 'rgba(249,0,13,0.51)').css('color', 'black');
                }
            }
        });
    });

    $('#tbl_productos tbody')
        .on('click', 'a[rel="take"]', function () {
            var tr = tbl_productos.cell($(this).closest('td, li')).index();
            var data = tbl_productos.row(tr.row).data();
            var parametros = {'id': data.id, 'action': 'get'};
            $.ajax({
                dataType: 'JSON',
                type: 'POST',
                url: window.location.pathname,
                data: parametros,
            })
                .done(function (data) {
                    if (!data.hasOwnProperty('error')) {
                        ventas.add(data[0]);
                        $('#Modal_search').modal('hide');
                        return false;
                    }
                    menssaje_error(data.error, data.content, 'fa fa-times-circle');
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus + ': ' + errorThrown);
                });
        });


    $('#id_tipo_pago')
        .select2({
            theme: "classic"
        })
        .on('select2:select', function (e) {
            if ($(this).val() === '1') {
                $('#credito').show();
                $('#id_nro_cuotas').TouchSpin({
                    min: 1,
                    max: 60,
                    step: 1
                }).val(1);
                amortizacion($('#id_nro_cuotas').val(), ($('#tasa_val').val() / 100), $('#id_total').val());

            } else {
                $('#credito').hide();
                amortizacion($('#id_nro_cuotas').val(0), ($('#tasa_val').val() / 100), $('#id_total').val());
            }
        });
    $('#id_nro_cuotas').on('change keyup', function () {
        amortizacion($(this).val(), ($('#tasa_val').val() / 100), $('#id_total').val());
    });


});

function amortizacion(cuotas, tasa, valor) {
    var ta = 1 + tasa;
    var pot = 1 / 12;
    var tem = Math.pow(ta, pot) - 1;
    var letra = valor * Math.pow(((1 - Math.pow(1 + tem, -cuotas)) / tem), -1);
    $('#id_interes').val(((letra * cuotas) - valor).toFixed(2));
    $('#id_letra').val(letra.toFixed(2));
    $('#id_tolal_deuda').val((letra * cuotas).toFixed(2));
}
