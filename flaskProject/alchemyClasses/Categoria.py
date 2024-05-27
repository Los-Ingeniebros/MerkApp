from sqlalchemy import Column, Integer, String
from alchemyClasses  import db
from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

class Categoria(db.Model):

    __tablename__ = 'categoria'
    idCategoria = Column(Integer, nullable=False, primary_key=True)
    nombre = Column(String(200), nullable=False)

    def __init__(self, idCategoria, nombre):
        self.idCategoria = idCategoria
        self.nombre = nombre

    # def __str__(self):
    #     return f'Nombre: {self.nombre}\n - Id: {self.idCategoria}\n'