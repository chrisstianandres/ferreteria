var tblventa;
var pago = {
    items: {
        abono: 0.00,
        cta: 0.00
    },
    list: function () {
        tblventa = $("#datatable").DataTable({
            destroy: true,
            autoWidth: false,
            dataSrc: "",
            responsive: true,
            language: {
                "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
            },
            ajax: {
                url: window.location.pathname,
                type: 'POST',
                data: {'action': 'letras'},
                dataSrc: ""
            },
            columns: [
                {data: 'fecha'},
                {data: 'fecha_pago'},
                {data: 'valor'},
                {data: 'estado_text'},
            ],
            columnDefs: [
                {
                    targets: '_all',
                    class: 'text-center'
                },
                {
                    targets: [-1],
                    orderable: false,
                    render: function (data, type, row) {
                        return '<span>' + data + '</span>'

                    }
                },
                {
                    targets: [-2],
                    orderable: false,
                    render: function (data, type, row) {
                        return '$' + parseFloat(data).toFixed(2);
                    }
                },
            ],
            createdRow: function (row, data, dataIndex) {
                if (data.estado === 2) {
                    $('td', row).eq(3).find('span').addClass('badge bg-success').attr("style", "color: white");
                } else if (data.estado === 1) {
                    $('td', row).eq(3).find('span').addClass('badge bg-danger').attr("style", "color: white");
                    if (data.fecha_pago === null) {
                        $('td', row).eq(1).html('<span class="badge bg-danger" style="color: white">' + data.estado_text + '</span>');
                    }
                } else if (data.estado === 0) {
                    $('td', row).eq(3).find('span').addClass('badge bg-warning').attr("style", "color: white");
                    if (data.fecha_pago === null) {
                        $('td', row).eq(1).html('<span class="badge bg-warning" style="color: white">' + data.estado_text + '</span>');
                    }
                }
            }
        });
    }
};
$(function () {
    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: {'action': 'cuenta'},
        dataSrc: "",
    }).done(function (data) {
        pago.items.cta=data;
    });
    // if (localStorage.getItem('carrito')) {
    //     carro_respaldo = JSON.parse(localStorage.getItem('carrito'));
    //     ventas.items.productos = carro_respaldo;
    //     ventas.list();
    // } else {
    //     ventas.list();
    // }
    // var action = '';
    // var pk = '';
    // //remover producto del detalle
    // $('#datatable tbody')
    //     .on('click', 'a[rel="remove"]', function () {
    //         var tr = tblventa.cell($(this).closest('td, li')).index();
    //         borrar_todo_alert('Alerta de Eliminación',
    //             'Esta seguro que desea eliminar este producto de tu detalle <br> ' +
    //             '<strong>CONTINUAR?</strong>', function () {
    //                 ventas.items.productos.splice(tr.row, 1);
    //                 ventas.list();
    //             })
    //     })
    //     .on('change keyup', 'input[name="cantidad"]', function () {
    //         var cantidad = parseInt($(this).val());
    //         var tr = tblventa.cell($(this).closest('td, li')).index();
    //         ventas.items.productos[tr.row].cantidad = cantidad;
    //         ventas.calculate();
    //         $('td:eq(7)', tblventa.row(tr.row).node()).html('$' + ventas.items.productos[tr.row].subtotal.toFixed(2));
    //     });
    // //remover todos los productos del detalle
    // $('.btnRemoveall').on('click', function () {
    //     if (ventas.items.productos.length === 0) return false;
    //     borrar_todo_alert('Alerta de Eliminación',
    //         'Esta seguro que desea eliminar todos los productos seleccionados? <br>' +
    //         '<strong>CONTINUAR?</strong>', function () {
    //             ventas.items.productos = [];
    //             ventas.list();
    //         });
    // });
    // //boton guardar
    // $('#save').on('click', function () {
    //     if (ventas.items.productos.length === 0) {
    //         menssaje_error('Error!', "Debe seleccionar al menos un producto", 'far fa-times-circle');
    //         return false
    //     } else {
    //         var total_venta = $('#id_total').val();
    //         $('#Modal_detalle').modal('show');
    //         $('#id_valor').val(total_venta);
    //         if (total_venta <= 1) {
    //             $('#id_tipo_pago').prop('disabled', true).val(0).trigger('change');
    //             $('#select2-id_tipo_pago-container').attr('title', 'El valor debe ser mayor a $ 1000 para ' +
    //                 'realizar un pago a credito');
    //             $('#credito').hide();
    //             amortizacion($('#id_nro_cuotas').val(0), ($('#tasa_val').val() / 100), $('#id_total').val());
    //         } else {
    //             $('#id_tipo_pago').prop('disabled', false);
    //         }
    //     }
    // });
    $('#save').on('click', function () {
        var abono = $('#id_abono').val();
            var parametros;
            pago.items.abono = parseFloat(abono);
            parametros = {'abono': JSON.stringify(pago.items)};
            parametros['action'] = 'abono';
            save_with_ajax('Alerta',
                window.location.pathname, 'Esta seguro que desea realizar un abono de $'+abono+'?', parametros,
                function () {

                });
        }
    );
    // //boton agregar cliente
    // $('#id_new_cliente').on('click', function () {
    //     $('#Modal_person').modal('show');
    // });
    // //enviar formulario de nuevo cliente
    // $('#form_person').on('submit', function (e) {
    //     e.preventDefault();
    //     var parametros = new FormData(this);
    //     parametros.append('action', 'add');
    //     parametros.append('id', '');
    //     var isvalid = $(this).valid();
    //     if (isvalid) {
    //         save_with_ajax2('Alerta',
    //             '/cliente/nuevo', 'Esta seguro que desea guardar este cliente?', parametros,
    //             function (response) {
    //                 menssaje_ok('Exito!', 'Exito al guardar este cliente!', 'far fa-smile-wink', function () {
    //                     $('#Modal_person').modal('hide');
    //                     var newOption = new Option(response.cliente['full_name'], response.cliente['id'], false, true);
    //                     $('#id_cliente').append(newOption).trigger('change');
    //                 });
    //             });
    //     }
    //
    // });
    // //buscar cliente en el select cliente
    // $('#id_cliente')
    //     .select2({
    //         theme: "classic",
    //         language: {
    //             inputTooShort: function () {
    //                 return "Ingresa al menos un caracter...";
    //             },
    //             "noResults": function () {
    //                 return "Sin resultados";
    //             },
    //             "searching": function () {
    //                 return "Buscando...";
    //             }
    //         },
    //         allowClear: true,
    //         ajax: {
    //             delay: 250,
    //             type: 'POST',
    //             url: '/cliente/lista',
    //             data: function (params) {
    //                 var queryParameters = {
    //                     term: params.term,
    //                     'action': 'search'
    //                 };
    //                 return queryParameters;
    //             },
    //             processResults: function (data) {
    //                 return {
    //                     results: data
    //                 };
    //
    //             },
    //
    //         },
    //         placeholder: 'Busca un cliente',
    //         minimumInputLength: 1,
    //     });
    // //mostrar el modal con el formulario cliente
    // $('#Modal_person').on('hidden.bs.modal', function (e) {
    //     reset('#form_person');
    //     $('#form_person').trigger("reset");
    // });
    //
    // //buscar produto del select producto
    // $('#id_inventario')
    //     .select2({
    //         theme: "classic",
    //         language: {
    //             inputTooShort: function () {
    //                 return "Ingresa al menos un caracter...";
    //             },
    //             "noResults": function () {
    //                 return "Sin resultados";
    //             },
    //             "searching": function () {
    //                 return "Buscando...";
    //             }
    //         },
    //         allowClear: true,
    //         ajax: {
    //             delay: 250,
    //             type: 'POST',
    //             url: '/producto/lista',
    //             data: function (params) {
    //                 var queryParameters = {
    //                     term: params.term,
    //                     'action': 'search',
    //                     'id': '',
    //                     'ids': JSON.stringify(ventas.get_ids())
    //                 };
    //                 return queryParameters;
    //             },
    //             processResults: function (data) {
    //                 return {
    //                     results: data
    //                 };
    //
    //             },
    //
    //         },
    //         placeholder: 'Busca un Producto',
    //         minimumInputLength: 1,
    //     })
    //     .on('select2:select', function (e) {
    //         $.ajax({
    //             type: "POST",
    //             url: '/producto/lista',
    //             data: {
    //                 "id": $('#id_inventario option:selected').val(),
    //                 'action': 'get'
    //             },
    //             dataType: 'json',
    //             success: function (data) {
    //                 ventas.add(data[0]);
    //                 $('#id_inventario').val(null).trigger('change');
    //             },
    //             error: function (xhr, status, data) {
    //                 alert(data);
    //             },
    //
    //         })
    //     });
    //
    // $('#id_search_table').on('click', function () {
    //     $('#Modal_search').modal('show');
    //     tbl_productos = $("#tbl_productos").DataTable({
    //         destroy: true,
    //         autoWidth: false,
    //         dataSrc: "",
    //         responsive: true,
    //         ajax: {
    //             url: '/producto/lista',
    //             type: 'POST',
    //             data: {'action': 'list_list', 'ids': JSON.stringify(ventas.get_ids())},
    //             dataSrc: ""
    //         },
    //         language: {
    //             "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
    //         },
    //         columns: [
    //             {data: "producto_base.nombre"},
    //             {data: "producto_base.categoria.nombre"},
    //             {data: "presentacion.nombre"},
    //             {data: "stock"},
    //             {data: "producto_base.descripcion"},
    //             {data: "pvp"},
    //             {data: "pcp"},
    //             {data: "imagen"},
    //             {data: "id"}
    //         ],
    //         columnDefs: [
    //             {
    //                 targets: [-3, -4],
    //                 class: 'text-center',
    //                 orderable: false,
    //                 render: function (data, type, row) {
    //                     return '$' + parseFloat(data).toFixed(2);
    //                 }
    //             },
    //             {
    //                 targets: [3],
    //                 class: 'text-center',
    //                 orderable: false,
    //                 render: function (data, type, row) {
    //                     return '<span class="badge badge-primary">' + data + '</span>';
    //                 }
    //             },
    //             {
    //                 targets: [-2],
    //                 class: 'text-center',
    //                 orderable: false,
    //                 render: function (data, type, row) {
    //                     return '<img src="' + data + '" width="30" height="30" class="img-circle elevation-2" rel="">';
    //                 }
    //             },
    //             {
    //                 targets: [-1],
    //                 class: 'text-center',
    //                 width: '10%',
    //                 orderable: false,
    //                 render: function (data, type, row) {
    //                     return row.stock > 1 ? '<a style="color: white" type="button" class="btn btn-success btn-xs" rel="take" ' +
    //                         'data-toggle="tooltip" title="Seleccionar Producto"><i class="fa fa-check"></i></a>' : ' ';
    //
    //                 }
    //             },
    //         ],
    //         rowCallback: function (row, data) {
    //             if (data.stock === 0) {
    //                 $('td', row).css('background-color', 'rgba(249,0,13,0.51)').css('color', 'black');
    //             }
    //         }
    //     });
    // });
    //
    // $('#tbl_productos tbody')
    //     .on('click', 'a[rel="take"]', function () {
    //         var tr = tbl_productos.cell($(this).closest('td, li')).index();
    //         var data = tbl_productos.row(tr.row).data();
    //         var parametros = {'id': data.id, 'action': 'get'};
    //         $.ajax({
    //             dataType: 'JSON',
    //             type: 'POST',
    //             url: '/producto/lista',
    //             data: parametros,
    //         })
    //             .done(function (data) {
    //                 if (!data.hasOwnProperty('error')) {
    //                     ventas.add(data[0]);
    //                     $('#Modal_search').modal('hide');
    //                     return false;
    //                 }
    //                 menssaje_error(data.error, data.content, 'fa fa-times-circle');
    //             })
    //             .fail(function (jqXHR, textStatus, errorThrown) {
    //                 alert(textStatus + ': ' + errorThrown);
    //             });
    //     });
    //
    //
    // $('#id_tipo_pago')
    //     .select2({
    //         theme: "classic"
    //     })
    //     .on('select2:select', function (e) {
    //         if ($(this).val() === '1') {
    //             $('#credito').show();
    //             $('#id_nro_cuotas').TouchSpin({
    //                 min: 1,
    //                 max: 60,
    //                 step: 1
    //             }).val(1);
    //             amortizacion($('#id_nro_cuotas').val(), ($('#tasa_val').val() / 100), $('#id_total').val());
    //
    //         } else {
    //             $('#credito').hide();
    //             amortizacion($('#id_nro_cuotas').val(0), ($('#tasa_val').val() / 100), $('#id_total').val());
    //         }
    //     });
    // $('#id_nro_cuotas').on('change keyup', function () {
    //     amortizacion($(this).val(), ($('#tasa_val').val() / 100), $('#id_total').val());
    // });
    pago.list();
    $('#id_abono').TouchSpin({
        min: 1,
        max: pago.items.cta[0],
        step: 0.01,
        decimals: 2,
        boostat: 5,
        maxboostedstep: 10,
        prefix: '$'
    });

});

