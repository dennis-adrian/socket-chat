//obtener todo el URL
var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');


//referencias de jquery

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


//Funciones para renderizar usuarios

function renderizarUsuarios(personas) {
    console.log(personas);

    var html = '';

    //creamos un string que contiene todo el html que vamos a necesitar
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '    <a data-id="' + personas[i].id + '"href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
};

function renderizarMensaje(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = "info";

    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {

        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Administrador') {

            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }



    //agrega el mensaje en la pantalla en un chat bubble
    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//listeners de jquery

//con este listener le decimos a jquery que este pendiente de caad click que se haga a un anchor tag (el tag "a") dentro de divUsuarios
divUsuarios.on('click', 'a', function() {
    //$(this) es una sintaxis especia de jquery que hace referncia al elemnto <a> que, en teoria, acabamos de hacer click
    var id = $(this).data('id');
    //id hace referencia a lo que pusimos despues de "data-" en la linea 23


    //si el elemento <a> que clickeamos tiene "id", nos los muestra
    if (id) {
        console.log(id);
    }
});

//submit es el tipo de buton que tiene el boton enviar, y con esta funcion, decimos a la app que hacer al hacer clic en el boton enviar
formEnviar.on('submit', function(event) {
    event.preventDefault();

    //obtener la informacion dentro de la caja de texto donde se escribe el mensaje
    //console.log(txtMensaje.val());

    //evitar que se envie un mensaje vacio
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    //Enviar mensje
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        //borra la caja de texto al apretar el boton de enviar
        txtMensaje.val('').focus();

        renderizarMensaje(mensaje, true);

        scrollBottom()
    });
});