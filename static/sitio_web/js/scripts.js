/*!
    * Start Bootstrap - Agency v6.0.3 (https://startbootstrap.com/theme/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */

var carro_respaldo, superuser=$('#superuser').val(), pagar;

var carrito = {
    items: {
        fecha_venta: '',
        subtotal: 0.00,
        total: 0.00,
        productos: [],
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
        var array = this.items.productos;
        if (array.length === 0) {
            array.push(data[0]);
            borrar_producto_carito('Un momento por favor!!', 'Agregando producto al carrito!', function () {
                menssaje_ok('Correcto!', 'Producto agregado al carrito!',
                    'fas fa-cart-plus', function () {
                    })
            })
        } else {
            var key = this.verify(array, data);

            if (key === 1) {
                borrar_producto_carito('Un momento por favor!!', 'Agregando producto al carrito!', function () {
                    menssaje_error('Atencion!', 'Este producto ya esta en tu carrito agrega mas cantidad desde este',
                        'fas fa-exclamation-circle', function () {
                        })
                })
            } else {
                array.push(data[0]);
                borrar_producto_carito('Un momento por favor!!', 'Agregando producto al carrito!', function () {
                    menssaje_ok('Correcto!', 'Producto agregado al carrito!',
                        'fas fa-cart-plus', function () {
                        })
                })
            }
        }
        localStorage.setItem('carrito', JSON.stringify(this.items.productos));
        this.list();
    },
    list: function () {
        this.calculate();
        var numero = this.items.productos.length;
        if (numero >= 1) {
            $('#count').html(numero);
        } else {
            $('#count').html('');
        }
        tblventa = $("#datatable").DataTable({
            autoWidth: false,
            dataSrc: "",
            responsive: true,
            dom:
                "<'row'<'col-sm-12'tr>>",
            language: {
                // "url": '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
                "emptyTable": "<strong>El carrito esta Vacio :´(</strong>"
            },
            data: carrito.items.productos,
            columns: [
                {data: 'id'},
                {data: "producto_base.nombre"},
                {data: "producto_base.categoria.nombre"},
                {data: "presentacion.nombre"},
                {data: "stock"},
                {data: "cantidad"},
                {data: "pvp"},
                {data: "subtotal"}
            ],
            destroy: true,
            columnDefs: [
                {
                    targets: [0],
                    class: 'text-center',
                    width: '5%',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<a rel="remove" type="button" class="btn btn-danger btn-xs btn-flat rounded-pill" ' +
                            'style="color: white" data-toggle="tooltip" title="Quitar Producto">' +
                            '<i class="fa fa-times"></i></a>';
                        //return '<a rel="remove" class="btn btn-danger btn-sm btn-flat"><i class="fas fa-trash-alt"></i></a>';

                    }
                },
                {
                    targets: [-2, -1],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '$' + parseFloat(data).toFixed(2);
                    }
                },
                {
                    targets: [-3],
                    class: 'text-center',
                    orderable: false,
                    render: function (data, type, row) {
                        return '<input type="text" name="cantidad" autocomplete="off" value="' + data + '">';

                    }
                }
            ],
            rowCallback: function (row, data) {
                $(row).find('input[name="cantidad"]').TouchSpin({
                    min: 1,
                    max: data.stock,
                    step: 1,
                    buttondown_class: 'btn btn-primary btn-sm',
                    buttonup_class: 'btn btn-primary btn-sm',

                }).keypress(function (e) {
                    if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
                        return false;
                    }
                }).keyup(function (e) {
                    e.preventDefault();
                    if ($(this).val() > data.stock) {
                        menssaje_error('Error!', 'No puede elegir una cantidad mayor que el stock disponible', 'fas fa-exclamation-circle');
                    }

                }).on('change', function (e) {
                    if ($(this).val() === '') {
                        $(this).val(1);
                        localStorage.clear();
                        var cantidad = parseInt($(this).val());
                        var tr = tblventa.cell($(this).closest('td, li')).index();
                        carrito.items.productos[tr.row].cantidad_venta = cantidad;
                        carrito.calculate();
                        localStorage.setItem('carrito', JSON.stringify(carrito.items.productos));
                        $('td:eq(7)', tblventa.row(tr.row).node()).html('$' + carrito.items.productos[tr.row].subtotal.toFixed(2));
                    }

                })
            }
        });
    },
    exclude_duplicados: function (array) {
        this.items.productos = [];
        let hash = {};
        result = array.filter(o => hash[o.id] ? false : hash[o.id] = true);
        return result;
    },
    verify: function (array, data) {
        ok = 0;
        $.each(array, function (key, value) {
                if (data[0].id === value.id) {
                    ok = 1;
                    return false;
                }
            }
        );
        return ok;
    }
};
(function ($) {
    "use strict"; // Start of use strict
    $('[data-toggle="tooltip"]').tooltip();
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ===
            this.pathname.replace(/^\//, "") &&
            location.hostname === this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if (varkey === 0) {
            if ($("#mainNav").offset().top > 100) {
                $("#mainNav").addClass("navbar-shrink");
            } else {
                $("#mainNav").removeClass("navbar-shrink");
            }
        }

    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);


    $('#ver_carro').on('click', function (e) {
        e.preventDefault();
        $('#carrito').modal('show');
    });


    if (localStorage.getItem('carrito')) {
        carro_respaldo = JSON.parse(localStorage.getItem('carrito'));
        carrito.items.productos = carro_respaldo;
        carrito.list();
         if(carrito.items.productos.length>0){
        $('#count').html(carrito.items.productos.length);
    }
    } else {
        carrito.list();
         if(carrito.items.productos.length>0){
        $('#count').html(carrito.items.productos.length);
    }
    }


    $(document).on('click', 'button[name="vender"]', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: window.location.pathname,
            data: {
                "id": $(this).val(),
                'action': 'get'
            },
            dataType: 'json',
            success: function (data) {
                if (data[0].stock === 0) {
                    menssaje_error('Error', 'Lo sentimos este producto no tiene stok disponible', 'far fa-sad-tear', function () {
                    })
                } else {
                    carrito.add(data);
                }

            },
            error: function (xhr, status, data) {
                alert(data);
            },

        })
    });

    $(document).on('click', 'a[rel="pay"]', function (e) {
        e.preventDefault();
        if (carrito.items.productos.length === 0) return false;
        if (superuser === 1) {
            localStorage.setItem('pagar', '1');
            localStorage.setItem('superuser', '1');
            window.location.href = '/venta/nuevo'
        } else {
            localStorage.setItem('pagar', '1');
            localStorage.setItem('superuser', '0');
            window.location.href = '/login'
        }
    });


    $('#datatable tbody')
        .on('click', 'a[rel="remove"]', function () {
            localStorage.clear();
            var tr = tblventa.cell($(this).closest('td, li')).index();
            borrar_todo_alert('Alerta de Eliminación',
                'Esta seguro que desea eliminar este producto del carrito <br> ' +
                '<strong>CONTINUAR?</strong>', function () {
                    carrito.items.productos.splice(tr.row, 1);
                    localStorage.setItem('carrito', JSON.stringify(carrito.items.productos));
                    carrito.list();
                })
        })
        .on('change keyup', 'input[name="cantidad"]', function () {
            localStorage.clear();
            var cantidad = parseInt($(this).val());
            var tr = tblventa.cell($(this).closest('td, li')).index();
            carrito.items.productos[tr.row].cantidad = cantidad;
            carrito.calculate();
            localStorage.setItem('carrito', JSON.stringify(carrito.items.productos));
            $('td:eq(7)', tblventa.row(tr.row).node()).html('$' + carrito.items.productos[tr.row].subtotal.toFixed(2));

        });
})(jQuery); // End of use strict
