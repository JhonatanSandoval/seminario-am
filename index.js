var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(9000, function () {
    console.log('=> Servidor iniciado ...');
});

var dao = require('./dao');

io.on('connection', function (socket) {
    socket.emit('mensaje_bienvenida', {
        titulo: 'Bienvenid@',
        mensaje: 'Hola Mundo, con Socket :)'
    });

    socket.on('actualizar_coordenadas', function (json) {
        var nombres = json.nombres;
        var latitud = json.latitud;
        var longitud = json.longitud;

        dao.selectTrackingByNombre(nombres, function (err, exists) {
            if (exists != null) { // existe, se actualiza
                dao.updateTracking(nombres, latitud, longitud, function (err, response) {
                    // hacer algo
                });
            } else { // se crea un nuevo registro
                dao.insertTracking(nombres, latitud, longitud, function (err, response) {
                    // hacer algo
                });
            }
        });
    });

    socket.on('enviar_mensaje', function (json) {
        var nombres = json.nombres, mensaje = json.mensaje;
        dao.insertMensaje(nombres, mensaje, function (err, response) {
            if (err) {
                console.error(err);
            }
            io.sockets.emit('nuevo_mensaje', json);
        });
    });

});