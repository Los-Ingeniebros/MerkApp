from sqlalchemy import Column, Integer, String, BLOB
from alchemyClasses  import db
from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

class Vendedor(db.Model):

    __tablename__ = 'vendedor'
    idVendedor = Column(Integer, nullable=False, primary_key=True)
    nombre = Column(String(200), nullable=False)
    apellidoPat = Column(String(200), nullable=False)
    apellidoMat = Column(String(200))
    contrasenia = Column(String(64), nullable=False)
    correo = Column(String(500), default=None, primary_key=True)
    telefono = Column(String(10), nullable=False, primary_key=True) 
    fotoDePerfil = Column(BLOB)           

    def __init__(self, idVendedor, nombre, apellidoPat, apellidoMat, contrasenia, telefono, correo, fotoDePerfil):
        self.idVendedor = idVendedor
        self.nombre = nombre
        self.apellidoPat = apellidoPat
        self.apellidoMat = apellidoMat
        self.contrasenia = contrasenia
        self.correo = correo
        self.telefono = telefono        
        self.fotoDePerfil = fotoDePerfil

    #Sugerencia, después poner las funciones en los modelos de tal manera que en app.py no tengamos eso y solo lo mandemos a llamar

    # def __str__(self):
    #     return f'Nombre completo: {self.nombre} {self.apellidoPat} {self.apellidoMat}\n - Id: {self.idVendedor}\n - Correo: {self.correo}\n - Contraseña: {self.contrasenia}\n - Teléfono: {self.telefono}\n'