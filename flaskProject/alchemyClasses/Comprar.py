from sqlalchemy import Column, Integer, String
from alchemyClasses  import db
from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

class Comprar(db.Model):

    __tablename__ = 'comprar'
    idCompra = Column(Integer, nullable=False, primary_key=True)
    idComprador = Column(Integer, nullable=False)
    idProducto = Column(Integer, nullable=False)
    comentario = Column(String(200))
    calificacion = Column(Integer)

    def __init__(self, idCompra, idComprador, idProducto, comentario, calificacion):
        self.idCompra = idCompra
        self.idComprador = idComprador
        self.idProducto = idProducto
        self.comentario = comentario
        self.calificacion = calificacion

    #Sugerencia, después poner las funciones en los modelos de tal manera que en app.py no tengamos eso y solo lo mandemos a llamar    

    # def __str__(self):
    #     return f'Nombre completo: {self.nombre} {self.apellidoPat} {self.apellidoMat}\n - Id: {self.idComprador}\n - Correo: {self.correo}\n - Contraseña: {self.contrasena}\n - Teléfono: {self.telefono}\n'