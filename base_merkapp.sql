create database base_merkaap;

create user 'lab'@'localhost' identified by 'Developer123!';

grant all privileges on base_merkaap.* to 'lab'@'localhost'
with grant option;

grant all privileges on base_merkaap.* to 'root@localhost'
with grant option;

use base_merkaap;

-- -------------TABLAS CON LLAVES PRIMARIAS-----------------


CREATE TABLE comprador (
    idComprador INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidoPat VARCHAR(50) NOT NULL, 
    apellidoMat VARCHAR(50),
    contrasenia VARCHAR(64) NOT NULL,
    correo VARCHAR(45) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    fotoDePerfil longblob,
    PRIMARY KEY (idComprador, correo, contrasenia),
    UNIQUE KEY correo (correo, contrasenia)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE vendedor (
    idVendedor INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellidoPat VARCHAR(50) NOT NULL,
    apellidoMat VARCHAR(50),
    contrasenia VARCHAR(64) NOT NULL,
    correo VARCHAR(45) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    fotoDePerfil longblob,
    PRIMARY KEY (idVendedor, correo, contrasenia),
    UNIQUE KEY correo (correo, contrasenia)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE categoria(
    idCategoria INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (idCategoria)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE producto(
    idProducto INT NOT NULL AUTO_INCREMENT,
    idVendedor INT NOT NULL,
    idCategoria INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    precio INT NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    fotoDeProducto longblob,
    PRIMARY KEY (idProducto),
    FOREIGN KEY (idVendedor) REFERENCES vendedor(idVendedor),
    FOREIGN KEY (idCategoria) REFERENCES categoria(idCategoria)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE comprar(
    idCompra INT NOT NULL AUTO_INCREMENT,
    idComprador INT NOT NULL,
    idProducto INT NOT NULL,
    comentario VARCHAR(200),
    calificacion INT,
    PRIMARY KEY (idCompra),
    FOREIGN KEY (idComprador) REFERENCES comprador(idComprador),
    FOREIGN KEY (idProducto) REFERENCES producto(idProducto)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
