const toDataURL = url => fetch(url).then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob)
    }));
toDataURL('/static/sitio_web/assets/img/header-bg.jpg').then(dataUrl => {
    logotipo = dataUrl;
});

function mostrar() {
    $('#div_table').removeClass('col-xl-12').addClass('col-xl-8 col-lg-12');
    $('#div_form').show();
    datatable.destroy();
    datatable_fun();
    $('#nuevo').hide();
}

function ocultar() {
    reset();
    $('#div_table').removeClass('col-xl-8 col-lg-12').addClass('col-xl-12');
    $('#div_form').hide();
    datatable.destroy();
    datatable_fun();
    $('#nuevo').show();
}

$('#cancel').on('click', function () {
    $('#div_table').removeClass('col-xl-8 col-lg-12').addClass('col-xl-12');
    ocultar();
});

function borrar_todo_alert(title, content, callback, callback2) {
    $.confirm({
        title: title,
        icon: 'fas fa-exclamation-triangle',
        type: 'red',
        typeAnimated: true,
        content: content,
        draggable: true,
        buttons: {
            si: {
                text: '<i class="fas fa-check"></i> Si',
                btnClass: 'btn-blue',
                action: function () {
                    callback();
                }
            },
            no: {
                text: '<i class="fas fa-times"></i> No',
                btnClass: 'btn-red'
            },
        }
    });
}

function save_with_ajax(title, url, content, parametros, callback) {
    $.confirm({
        theme: 'modern',
        icon: 'fas fa-exclamation-circle',
        title: title,
        type: 'blue',
        content: content,
        columnClass: 'small',
        draggable: true,
        buttons: {
            si: {
                text: '<i class="fas fa-check"></i> Si',
                btnClass: 'btn-blue',
                action: function () {
                    $.ajax({
                        dataType: 'JSON',
                        type: 'POST',
                        url: url,
                        data: parametros,
                    }).done(function (data) {
                        if (!data.hasOwnProperty('error')) {
                            callback(data);
                            return false;
                        }
                        menssaje_error('Error', data.error, 'fas fa-exclamation-circle');

                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + ': ' + errorThrown);
                    });
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
}

function callback(response) {
    printpdf('Alerta!', '¿Desea generar el comprobante en PDF?', function () {
        window.open('/venta/printpdf/' + response['id'], '_blank');
        // location.href = '/venta/printpdf/' + response['id'];
        localStorage.clear();
        location.href = '/venta/lista';
    }, function () {
        localStorage.clear();
        location.href = '/venta/lista';
    })

}

function callback_2(response, entidad) {
    printpdf('Alerta!', '¿Desea generar el comprobante en PDF?', function () {
        window.open('/' + entidad + '/printpdf/' + response['id'], '_blank');
        localStorage.clear();
        location.href = '/' + entidad + '/lista';
    }, function () {
        localStorage.clear();
        location.href = '/' + entidad + '/lista';
    })

}

function save_estado(title, url, content, parametros, callback) {
    $.confirm({
        theme: 'supervan',
        type: 'red',
        icon: 'fas fa-exclamation-circle',
        title: title,
        content: content,
        columnClass: 'small',
        draggable: true,
        buttons: {
            si: {
                text: '<i class="fas fa-check"></i> Si',
                btnClass: 'btn-blue',
                action: function () {
                    $.ajax({
                        dataType: 'JSON',
                        type: 'POST',
                        url: url,
                        data: parametros,
                    }).done(function (data) {
                        if (!data.hasOwnProperty('error')) {
                            callback();
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
}

function printpdf(title, content, callback, cancel) {
    $.confirm({
            theme: 'modern',
            type: 'blue',
            icon: 'fas fa-exclamation-circle',
            title: title,
            content: content,
            columnClass: 'small',
            draggable: true,
            buttons: {
                si: {
                    text: '<i class="fas fa-check"></i> Si',
                    btnClass: 'btn-blue',
                    action: function () {
                        callback();
                    }
                },
                no: {
                    text: '<i class="fas fa-times"></i> No',
                    btnClass: 'btn-red',
                    action: function () {
                        cancel();
                    }
                }
            }
        }
    );
}

function menssaje_error(title, content, icon, callback) {
    var obj = $.confirm({
        theme: 'modern',
        icon: icon,
        title: title,
        type: 'red',
        content: content,
        draggable: true,
        buttons: {
            info: {
                text: '<i class="fas fa-check"></i> Ok',
                btnClass: 'btn-blue'
            },
        }
    });
    setTimeout(function () {
        // some point in future.
        obj.close();
    }, 3000);
}

function error_login(title, content, icon, callback) {
    $.confirm({
        theme: 'modern',
        icon: icon,
        title: title,
        type: 'red',
        content: content,
        draggable: true,
        buttons: {
            info: {
                text: '<i class="fas fa-check"></i> Ok',
                btnClass: 'btn-blue',
                action: function () {
                    callback();
                }

            },
        }
    });
}

function menssaje_ok(title, content, icon, callback) {
    $.confirm({
        theme: 'supervan',
        icon: icon,
        type: 'green',
        title: title,
        content: content,
        draggable: true,
        buttons: {
            info: {
                text: '<i class="fas fa-check"></i> Ok',
                btnClass: 'btn-blue',
                action: function (data) {
                    callback(data);
                }
            },
        }
    });
}

function login(url, parametros, callback, callback2) {
    $.ajax({
        dataType: 'JSON',
        type: 'POST',
        url: url,
        data: parametros,
    }).done(function (data) {
        if (!data.hasOwnProperty('error')) {
            callback();
            return false;
        }
        error_login('Error', data.error, 'fas fa-exclamation-circle', callback2);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(textStatus + ': ' + errorThrown);
    })


}

function save_with_ajax2(title, url, content, parametros, callback) {
    $.confirm({
        theme: 'supervan',
        icon: 'fas fa-exclamation-circle',
        title: title,
        type: 'blue',
        content: content,
        columnClass: 'small',
        draggable: true,
        buttons: {
            si: {
                text: '<i class="fas fa-check"></i> Si',
                btnClass: 'btn-blue',
                action: function () {
                    $.ajax({
                        dataType: 'JSON',
                        type: 'POST',
                        url: url,
                        processData: false,
                        contentType: false,
                        data: parametros,
                    }).done(function (data) {
                        if (!data.hasOwnProperty('error')) {
                            callback(data);
                            return false;
                        }
                        menssaje_error_form('Error', data.error, 'fas fa-exclamation-circle');

                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + ': ' + errorThrown);
                    });
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
}

function reset() {
    $("#form")[0].reset();
    var validator = $("#form").validate();
    validator.resetForm();
    $('.is-valid').removeClass('is-valid');
    $('.is-invalid').removeClass('is-invalid');
}

function menssaje_error_form(title, content, icon, callback) {
    var html = '<ul>';
    $.each(content, function (key, value) {
        html += '<li>' + key + ': ' + value + '</li>'
    });
    html += '</ul>';
    $.confirm({
        theme: 'modern',
        icon: icon,
        title: title,
        type: 'red',
        content: html,
        draggable: true,
        buttons: {
            info: {
                text: '<i class="fas fa-check"></i> Ok',
                btnClass: 'btn-blue'
            },
        }
    });
}


function borrar_producto_carito(title, content, callback) {
    var obj = $.dialog({
        icon: 'fa fa-spinner fa-spin',
        title: title,
        content: content,
        type: 'blue',
        typeAnimated: true,
        draggable: true,
        onClose: function () {
            callback();
        },
    });
    setTimeout(function () {
        // some point in future.
        obj.close();
    }, 2000);


}


function customize(doc) {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre"
    ];
    var date = new Date();

    function formatDateToString(date) {
        // 01, 02, 03, ... 29, 30, 31
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        // 01, 02, 03, ... 10, 11, 12
        // month < 10 ? '0' + month : '' + month; // ('' + month) for string result
        var MM = monthNames[date.getMonth() + 1]; //monthNames[d.getMonth()])
        // 1970, 1971, ... 2015, 2016, ...
        var yyyy = date.getFullYear();
        // create the format you want
        return (dd + " de " + MM + " de " + yyyy);
    }

    var jsDate = formatDateToString(date);
    //[izquierda, arriba, derecha, abajo]
    doc.pageMargins = [25, 120, 25, 50];
    doc.defaultStyle.fontSize = 12;
    doc.styles.tableHeader.fontSize = 14;
    doc['header'] = (function () {
        return {
            columns: [{alignment: 'center', image: logotipo, width: 300}],
            margin: [280, 10, 0, 0] //[izquierda, arriba, derecha, abajo]
        }
    });
    doc['footer'] = (function (page, pages) {
        return {
            columns: [
                {
                    alignment: 'left',
                    text: ['Reporte creado el: ', {text: jsDate.toString()}]
                },
                {
                    alignment: 'right',
                    text: ['Pagina ', {text: page.toString()}, ' de ', {text: pages.toString()}]
                }
            ],
            margin: 20
        }
    });
    var objLayout = {};
    objLayout['hLineWidth'] = function (i) {
        return .5;
    };
    objLayout['vLineWidth'] = function (i) {
        return .5;
    };
    objLayout['hLineColor'] = function (i) {
        return '#000000';
    };
    objLayout['vLineColor'] = function (i) {
        return '#000000';
    };
    objLayout['paddingLeft'] = function (i) {
        return 4;
    };
    objLayout['paddingRight'] = function (i) {
        return 4;
    };
    doc.content[0].layout = objLayout;
    // doc.content[1].table.widths = [35, '*', 55, 90, 180, 70, 150];
    var colCount = new Array();
    $('#datatable').find('tbody tr:first-child td').each(function () {
        if ($(this).attr('colspan')) {
            for (var i = 1; i <= $(this).attr('colspan'); $i++) {
                colCount.push('*');
            }
        } else {
            colCount.push('*');
        }
    });
    doc.content[1].table.widths = colCount;
    doc.styles.tableBodyEven.alignment = 'center';
    doc.styles.tableBodyOdd.alignment = 'center';
}


function validador(){
    jQuery.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-z," "]+$/i.test(value);
}, "Solo puede ingresar letras y espacios");


$.validator.setDefaults({
    errorClass: 'invalid-feedback',

    highlight: function (element, errorClass, validClass) {
        $(element)
            .addClass("is-invalid")
            .removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element)
            .addClass("is-valid")
            .removeClass("is-invalid");
    }
});
}
