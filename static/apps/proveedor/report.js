var datatable;
var year = $('#id_anos').val();
var datos = {
    fechas: {
        'start_date': year + '-01-01',
        'end_date': year + '-12-31',
        'action': 'report',
        'key': 0
    },
    add: function (data) {
        this.fechas['key'] = data.key;
        if (data.key === 0 || data.key === 1 || data.key === 4) {
            this.fechas['start_date'] = data.start_date;
            this.fechas['end_date'] = data.end_date;
        } else if (data.key === 2) {
            this.fechas['start_date'] = data.startDate.format('YYYY-MM-DD');
            this.fechas['end_date'] = data.endDate.format('YYYY-MM-DD');
        } else {
            this.fechas['start_date'] = '';
            this.fechas['end_date'] = ''
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
    datatable = $('#datatable').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: datos.fechas,
            dataSrc: ""
        },
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json',
        },
        searching: false,
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
                    text: '<i class="fa fa-file-pdf"> </i> PDF ',
                    className: 'btn btn-danger',
                    extend: 'pdfHtml5',
                    orientation: 'landscape', //portrait
                    pageSize: 'A4', //A3 , A5 , A6 , legal , letter
                    download: 'open',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6],
                        search: 'applied',
                        order: 'applied'
                    },
                    customize: function customize_report(doc) {
                        doc.styles = {
                            header: {
                                fontSize: 30,
                                bold: true,
                                alignment: 'center'
                            },
                            subheader: {
                                fontSize: 13,
                                bold: true
                            },
                            quote: {
                                italics: true
                            },
                            small: {
                                fontSize: 8
                            },
                            tableHeader: {
                                bold: true,
                                fontSize: 11,
                                color: 'white',
                                fillColor: '#4e73df',
                                alignment: 'center'
                            }
                        };
                        doc.content.splice(0, 0, {
                            margin: [0, -5, 0, 12],
                            width: 250, height: 100,
                            alignment: 'center',
                            image: logotipo
                        });
                        doc.content.splice(1, 0, {
                            text: $('#nombre_empresa').text(),
                            style: 'header',
                        });
                        doc.content.splice(2, 0, {
                            alignment: 'center',
                            text: 'Direccion: ' + $('#id_direccion').val(),
                            style: 'subheader'
                        });
                        doc.content.splice(3, 0, {
                            alignment: 'center',
                            text: 'Ruc: ' + $('#id_ruc').val(),
                            style: 'subheader'
                        });
                        doc.content.splice(4, 0, {
                            alignment: 'center',
                            text: $('#id_ciudad').val(),
                            style: 'small'
                        });
                        doc.content.splice(5, 0, {
                            text: 'Reporte generado por: ' + $('#id_user').val(),
                            style: 'subheader',
                            margin: [0, 0, 0, 20],
                        });
                        doc.content.splice(8, 0, {
                            margin: [0, 50, 0, 12],
                            text: '___________________________________',
                            style: 'subheader',
                            alignment: 'center',
                        });
                        doc.content.splice(9, 0, {
                            margin: [0, 0, 0, 0],
                            text: 'Firma del reponsable del reporte',
                            style: 'subheader',
                            alignment: 'center',
                        });
                        doc.styles.title = {fontSize: '25', alignment: 'center'};
                        doc.content[7].table.widths = ["*", "*", "*", "*", "*", "*", "*", "*"];
                        doc.content[7].margin = [0, 35, 0, 0];
                        doc.content[7].layout = {};
                        doc['footer'] = (function (page, pages) {
                            return {
                                columns: [
                                    {
                                        alignment: 'left',
                                        text: ['Reporte generado el: ', {text: jsDate.toString()}]
                                    },
                                    {
                                        alignment: 'right',
                                        text: ['página ', {text: page.toString()}, ' de ', {text: pages.toString()}]
                                    }
                                ],
                                margin: 20
                            }
                        });
                    },
                },
                {
                    text: '<i class="far fa-file-excel"></i> Excel</i>', className: "btn btn-success my_class",
                    extend: 'excel',
                    footer: true
                }
            ],
        },
        columns: [
            {"data": "fecha"},
            {"data": "nombre"},
            {"data": "tipo"},
            {"data": "num_doc"},
            {"data": "correo"},
            {"data": "telefono"},
            {"data": "direccion"}
        ],
        columnDefs: [
            {
                targets: '_all',
                class: 'text-center',
            },
        ]
    });
    $('#search').on('change', function () {
        daterange();
        if ($(this).val() === '0') {
            $('#year_seccion').show();
            $('#range_date').hide();
            $('#month_seccion').hide();
            $('#names').hide();
        } else if ($(this).val() === '1') {
            $('#year_seccion').show();
            $('#range_date').hide();
            $('#names').hide();
            $('#month_seccion').show();
        } else if ($(this).val() === '2') {
            $('#year_seccion').hide();
            $('#range_date').show();
            $('#names').hide();
            $('#month_seccion').hide();
        } else if ($(this).val() === '4') {
            $('#year_seccion').hide();
            $('#range_date').hide();
            $('#names').show();
            $('#month_seccion').hide();
        } else {
            $('#year_seccion').hide();
            $('#range_date').hide();
            $('#month_seccion').hide();
            $('#names').hide();
        }
    });
    $('#id_anos').on('change', function () {
        daterange()
    });
    $('#month').on('change', function () {
        daterange()
    });
    $('#names_select').on('keyup', function () {
        daterange()
    });
    $('#fecha').on('apply.daterangepicker', function (ev, picker) {
        picker['key'] = 2;
        datos.add(picker);
    });

});

function daterange() {
    year = $('#id_anos').val();
    // $("div.toolbar").html('<br><div class="col-lg-3"><input type="text" name="fecha" class="form-control form-control-sm input-sm"></div> <br>');
    var picker = {};
    var search = $('#search').val();
    if (search === '0') {
        picker['key'] = 0;
        picker['start_date'] = year + '-01-01';
        picker['end_date'] = year + '-12-31';
        datos.add(picker);
    } else if (search === '1') {
        picker['key'] = 1;
        picker['start_date'] = year;
        picker['end_date'] = $('#month').val();
        datos.add(picker);
    } else if (search === '2') {
        $('input[name="fecha"]').daterangepicker({
            locale: {
                format: 'YYYY-MM-DD',
                applyLabel: '<i class="fas fa-search"></i> Buscar',
                cancelLabel: '<i class="fas fa-times"></i> Cancelar',
            },
            showDropdowns: true,
        });
    } else if (search === '4') {
        picker['key'] = 4;
        picker['end_date'] = '';
        picker['start_date'] = $('#names_select').val();
        datos.add(picker);
    } else {
        picker['key'] = 3;
        datos.add(picker);
    }
}
