from sqlalchemy import Column, Integer, String
from alchemyClasses  import db
from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

class Categoria(db.Model):

    __tablename__ = 'categoria'
    idCategoria = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)

    def __init__(self, idCategoria, nombre):
        self.idCategoria = idCategoria
        self.nombre = nombre

    def __str__(self):
        return f'Nombre: {self.nombre}\n - Id: {self.idCategoria}\n'