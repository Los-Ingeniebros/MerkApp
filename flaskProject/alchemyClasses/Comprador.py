from sqlalchemy import Column, Integer, String, BLOB
from alchemyClasses  import db
from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

class Comprador(db.Model):

    __tablename__ = 'comprador'
    idComprador = Column(Integer, nullable=False, primary_key=True, autoincrement=True)
    nombre = Column(String(200), nullable=False)
    apellidoPat = Column(String(200), nullable=False)
    apellidoMat = Column(String(200))
    contrasenia = Column(String(64), nullable=False)
    correo = Column(String(500), default=None)
    telefono = Column(String(10), nullable=False) 
    fotoDePerfil = Column(BLOB,nullable=True) 

    def __init__(self, nombre, apellidoPat, apellidoMat, contrasenia, telefono, correo):
        self.nombre = nombre
        self.apellidoPat = apellidoPat
        self.apellidoMat = apellidoMat
        self.contrasenia = contrasenia
        self.correo = correo
        self.telefono = telefono 

    #Sugerencia, después poner las funciones en los modelos de tal manera que en app.py no tengamos eso y solo lo mandemos a llamar

    # def __str__(self):
    #     return f'Nombre completo: {self.nombre} {self.apellidoPat} {self.apellidoMat}\n - Id: {self.idComprador}\n - Correo: {self.correo}\n - Contraseña: {self.contrasenia}\n - Teléfono: {self.telefono}\n'