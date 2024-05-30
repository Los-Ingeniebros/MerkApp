from sqlalchemy import Column, Integer, String, BLOB
from alchemyClasses  import db
from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

class Producto(db.Model):

    __tablename__ = 'producto'

    #idProducto = Column(Integer, nullable=False, primary_key=True)
    idProducto = db.Column(db.Integer, primary_key=True)

    #idVendedor = Column(Integer, nullable=False)
    idVendedor = db.Column(db.Integer, db.ForeignKey('vendedor.idVendedor'), nullable=False)

    #idCategoria = Column(Integer, nullable=False)
    idCategoria = db.Column(db.Integer, db.ForeignKey('categoria.idCategoria'), nullable=False)

    #nombre = Column(String(200), nullable=False)
    nombre = db.Column(db.String(50), nullable=False)

    #descripcion = Column(String(200), nullable=False)
    descripcion = db.Column(db.String(200), nullable=False)

    #precio = Column(Integer, nullable=False)
    precio = db.Column(db.Integer, nullable=False, default=0)

    #stock = Column(Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)

    #fotoDeProducto = Column(BLOB)
    fotoDeProducto = db.Column(db.LargeBinary, nullable=True)

    def __init__(self, idProducto, idVendedor, idCategoria, nombre, descripcion, precio, stock, fotoDeProducto):
        self.idProducto = idProducto
        self.idVendedor = idVendedor
        self.idCategoria = idCategoria
        self.nombre = nombre
        self.descripcion = descripcion
        self.precio = precio
        self.stock = stock
        self.fotoDeProducto = fotoDeProducto

    #Sugerencia, después poner las funciones en los modelos de tal manera que en app.py no tengamos eso y solo lo mandemos a llamar

    # def __str__(self):
    #     return f'Nombre completo: {self.nombre} {self.apellidoPat} {self.apellidoMat}\n - Id: {self.idComprador}\n - Correo: {self.correo}\n - Contraseña: {self.contrasena}\n - Teléfono: {self.telefono}\n'