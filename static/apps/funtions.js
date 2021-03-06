var tbl_productos;
const toDataURL = url => fetch(url).then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob)
    }));

toDataURL($('#id_logo').val()).then(dataUrl => {
    logotipo = dataUrl;
});
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
    "Noviembre", "Diciembre"
];
var date = new Date();

function formatDateToString(date) {
    // 01, 02, 03, ... 29, 30, 31
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    // month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    var MM = monthNames[date.getMonth()]; //monthNames[d.getMonth()])
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = date.getFullYear();
    // create the format you want
    return (dd + " de " + MM + " de " + yyyy);
}

var jsDate = formatDateToString(date);


function mostrar() {
    $('#div_table').removeClass('col-xl-12').addClass('col-xl-8 col-lg-12');
    $('#div_form').show();
    datatable.destroy();
    datatable_fun();
    $('#nuevo').hide();
}

function ocultar(form) {
    reset(form);
    $('#div_table').removeClass('col-xl-8 col-lg-12').addClass('col-xl-12');
    $('#div_form').hide();
    datatable.destroy();
    datatable_fun();
    $('#nuevo').show();
}

$('#cancel').on('click', function () {
    $('#div_table').removeClass('col-xl-8 col-lg-12').addClass('col-xl-12');
    ocultar('#form');
});

function borrar_todo_alert(title, content, callback, callback2) {
    $.confirm({
        theme: 'supervan',
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
        theme: 'supervan',
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

function reset(formulario) {
    $(formulario)[0].reset();
    var validator = $(formulario).validate();
    validator.resetForm();
    $('.is-valid').removeClass('is-valid');
    $('.is-invalid').removeClass('is-invalid');
}

// function menssaje_error_form(title, content, icon, callback) {
//     var html = '<ul>';
//     $.each(content, function (key, value) {
//         html += '<li>' + key + ': ' + value + '</li>'
//     });
//     html += '</ul>';
//     $.confirm({
//         theme: 'modern',
//         icon: icon,
//         title: title,
//         type: 'red',
//         content: html,
//         draggable: true,
//         buttons: {
//             info: {
//                 text: '<i class="fas fa-check"></i> Ok',
//                 btnClass: 'btn-blue'
//             },
//         }
//     });
// }
function menssaje_error_form(title, obj, icon, callback) {
    var html = '';
    if (typeof (obj) === 'object') {
        html = '<ul style="text-align: left;">';
        $.each(obj, function (key, value) {
            html += '<li>' + key + ': ' + value + '</li>';
        });
        html += '</ul>';
    } else {
        html = '<p>' + obj + '</p>';
    }
    $.confirm({
        theme: 'supervan',
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
        icon: 'fas fa-circle-notch fa-spin',
        title: title,
        content: content,
        type: 'orange',
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


// function customize(doc) {
//     //[izquierda, arriba, derecha, abajo]
//     doc.pageMargins = [25, 150, 25, 50];
//     doc.defaultStyle.fontSize = 12;
//     doc.styles.tableHeader.fontSize = 12;
//     doc.content[1].table.body[0].forEach(function (h) {
//         h.fillColor = '#4e73df'
//     });
//     doc.styles.title = {color: '#2D1D10', fontSize: '16', alignment: 'center'};
//     doc['header'] = (function () {
//         return {
//             columns: [
//                 {
//                     alignment: 'left', image: logotipo, width: 180, height: 100
//                 },
//                 {
//                     text: $('#nombre_empresa').text(), fontSize: 45, alignment: 'center', margin: [-90, 30, 0]
//                 },
//             ],
//             margin: [20, 10, 0, 0],  //[izquierda, arriba, derecha, abajo]
//
//
//         }
//     });
//     doc['footer'] = (function (page, pages) {
//         return {
//             columns: [
//                 {
//                     alignment: 'left',
//                     text: ['Reporte creado el: ', {text: jsDate.toString()}]
//                 },
//                 {
//                     alignment: 'right',
//                     text: ['Pagina ', {text: page.toString()}, ' de ', {text: pages.toString()}]
//                 }
//             ],
//             margin: 20
//         }
//     });
//     var objLayout = {};
//     objLayout['hLineWidth'] = function (i) {
//         return .5;
//     };
//     objLayout['vLineWidth'] = function (i) {
//         return .5;
//     };
//     objLayout['hLineColor'] = function (i) {
//         return '#000000';
//     };
//     objLayout['vLineColor'] = function (i) {
//         return '#000000';
//     };
//     objLayout['paddingLeft'] = function (i) {
//         return 4;
//     };
//     objLayout['paddingRight'] = function (i) {
//         return 4;
//     };
//     doc.content[0].layout = objLayout;
//     doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
//     doc.styles.tableBodyEven.alignment = 'center';
//     doc.styles.tableBodyOdd.alignment = 'center';
// }

// function customize_report(doc) {
//     //[izquierda, arriba, derecha, abajo]
//     doc.pageMargins = [25, 180, 25, 50];
//     doc.defaultStyle.fontSize = 12;
//     doc.styles.tableHeader.fontSize = 12;
//     doc.content[1].table.body[0].forEach(function (h) {
//         h.fillColor = '#4e73df'
//     });
//     doc.content[1].table.body[doc.content[1].table.body.length - 1].forEach(function (h) {
//         h.fillColor = '#4e73df'
//     });
//     doc.styles.title = {color: '#2D1D10', fontSize: '16', alignment: 'center'};
//     var dir = $('#id_direccion').css("font-size", 12);
//     var ruc = $('#id_ruc').css("font-size", 12);
//     doc['header'] = (function () {
//         return {
//             columns: [
//                 {
//                     alignment: 'left', image: logotipo, width: 180, height: 100
//                 },
//                 {
//                     text: $('#nombre_empresa').text() + '\n' + dir.val() + '\n' + ruc.val(),
//                     fontSize: 25,
//                     alignment: 'center'
//                 },
//             ],
//             margin: [20, 10, 0, 0],  //[izquierda, arriba, derecha, abajo]
//
//
//         }
//     });
//     doc['footer'] = (function (page, pages) {
//         return {
//             columns: [
//                 {
//                     alignment: 'left',
//                     text: ['Reporte creado el: ', {text: jsDate.toString()}]
//                 },
//                 {
//                     alignment: 'right',
//                     text: ['Pagina ', {text: page.toString()}, ' de ', {text: pages.toString()}]
//                 }
//             ],
//             margin: 20
//         }
//     });
//     var objLayout = {};
//     objLayout['hLineWidth'] = function (i) {
//         return .5;
//     };
//     objLayout['vLineWidth'] = function (i) {
//         return .5;
//     };
//     objLayout['hLineColor'] = function (i) {
//         return '#000000';
//     };
//     objLayout['vLineColor'] = function (i) {
//         return '#000000';
//     };
//     objLayout['paddingLeft'] = function (i) {
//         return 4;
//     };
//     objLayout['paddingRight'] = function (i) {
//         return 4;
//     };
//     doc.content[0].layout = objLayout;
//     doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
//     doc.styles.tableBodyEven.alignment = 'center';
//     doc.styles.tableBodyOdd.alignment = 'center';
// }

function customize_report(doc) {
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
        text: 'Reporte generado por: '+$('#id_user').val(),
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
    doc.content[7].table.widths = Array(doc.content[7].table.body[0].length + 1).join('*').split('');
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
}


function validador() {
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

    jQuery.validator.addMethod("val_ced", function (value, element) {
        if (element.classList.contains('is-valid')) {
            return true
        } else {
            if (value.length === 10 || value.length === 13) {
                $.ajax({
                    type: "POST",
                    url: '/verificar/',
                    data: {'data': value.toString()},
                    dataType: 'json',
                    success: function (data) {
                        if (!data.hasOwnProperty('error')) {
                            $(element).addClass("is-valid").removeClass("is-invalid");
                            return true
                        } else {
                            $(element).addClass("is-invalid").removeClass("is-valid");
                            return false
                        }

                    },
                })
            }
        }

        // return this.optional(element) || /^[a-z," "]+$/i.test(value);
    }, "");

    jQuery.validator.addMethod("validar", function (value, element) {
        return validar(element);
    }, "Número de documento no valido para Ecuador");

    function validar(element) {
        var cad = document.getElementById(element.id).value.trim();
        var total = 0;
        var longitud = cad.length;
        var longcheck = longitud - 1;
        if (longitud === 10) {
            return aux(total, cad);
        } else if (longitud === 13 && cad.slice(10, 13) !== '000') {
            return aux(total, cad);
        } else {
            return false;
        }
    }

    function aux(total, cad) {
        if (cad !== "") {
            for (var i = 0; i < 9; i++) {
                if (i % 2 === 0) {
                    var aux = cad.charAt(i) * 2;
                    if (aux > 9) aux -= 9;
                    total += aux;
                } else {
                    total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
                }
            }

            total = total % 10 ? 10 - total % 10 : 0;
            return parseInt(cad.charAt(9)) === total;
        }
    }
}


function year_footer() {
    var ano = (new Date).getFullYear();
    $('#year').text(ano);

}

function reloj() {
    var fecha_js = new Date;
    var segundos = fecha_js.getSeconds() <= 9 ? '0' + fecha_js.getSeconds() : fecha_js.getSeconds();
    var hora = fecha_js.getHours() <= 9 ? '0' + fecha_js.getHours() : fecha_js.getHours();
    var minutos = fecha_js.getMinutes() <= 9 ? '0' + fecha_js.getMinutes() : fecha_js.getMinutes();

    // segundos++;
    // if (segundos === 60) {
    //     segundos = 0;
    //     minutos++;
    //     if (minutos === 60) {
    //         minutos = 0;
    //         hora++;
    //         if (hora === 24) {
    //             hora = 0;
    //         }
    //     }
    // }
    document.getElementById("reloj").innerHTML = " " + hora + ":" + minutos + ":" + segundos;
}

