var mysql = require('mysql');
var config = require('./config');

var pool = mysql.createPool({
    connectionLimit: 400,
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    port: config.db_port,
    debug: false
});

exports.updateTracking = function (nombres, latitud, longitud, callback) {
    pool.getConnection(function (err, conn) {
        var sql = ' UPDATE tracking SET latitud = ? , longitud = ? , updated_at = NOW() WHERE nombres = ? ';
        conn.query(sql, [latitud, longitud, nombres], function (err, rs) {
            conn.release();
            callback(err, rs);
        });
    });
};

exports.insertTracking = function (nombres, latitud, longitud, callback) {
    pool.getConnection(function (err, conn) {
        var sql = ' INSERT INTO tracking (nombres, latitud, longitud) VALUES (?,?,?) ';
        conn.query(sql, [nombres, latitud, longitud], function (err, rs) {
            conn.release();
            callback(err, rs);
        });
    });
};

exports.selectTrackingByNombre = function (nombres, callback) {
    pool.getConnection(function (err, conn) {
        var sql = ' SELECT * FROM tracking WHERE nombres = ? ';
        conn.query(sql, [nombres], function (err, rs) {
            conn.release();
            callback(err, rs[0]);
        });
    });
};

exports.insertMensaje = function (nombres, mensaje, callback) {
    pool.getConnection(function (err, conn) {
        var sql = ' INSERT INTO mensajes (nombres, mensaje) VALUES (?,?) ';
        conn.query(sql, [nombres, mensaje], function (err, rs) {
            conn.release();
            callback(err, rs);
        });
    });
};

exports.selectMensajes = function (callback) {
    pool.getConnection(function (err, conn) {
        var sql = ' SELECT * FROM mensajes ';
        conn.query(sql, [], function (err, rs) {
            conn.release();
            callback(err, rs);
        });
    });
};