CREATE DATABASE IF NOT EXISTS seminario_am;
USE seminario_am;

CREATE TABLE IF NOT EXISTS tracking (
    id_tracking INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(300),
    latitud DECIMAL(15,7),
    longitud DECIMAL(15,7),
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS mensajes(
    id_mensaje INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(300),
    mensaje VARCHAR(500),
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS dispositivos(
  id_dispositivo INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(300),
    created_at TIMESTAMP NOT NULL
);