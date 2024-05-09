from sqlalchemy import Column, Integer, String, BLOB
from alchemyClasses  import db
from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

class Producto(db.Model):

    __tablename__ = 'producto'
    idProducto = Column(Integer, nullable=False, primary_key=True)
    foto = Column(BLOB, nullable=False)
    descripcion = Column(String(200), nullable=False)
    precio = Column(Integer, nullable=False)
    telefono = Column(String(10), foreign_key=True)
    correo = Column(String(500), foreign_key=True)

    def __init__(self, idProducto, foto, descripcion, precio, telefono, correo):
        self.idProducto = idProducto
        self.foto = foto
        self.descripcion = descripcion
        self.precio = precio
        self.telefono = telefono
        self.correo = correo

    #Sugerencia, después poner las funciones en los modelos de tal manera que en app.py no tengamos eso y solo lo mandemos a llamar
    def session(self, idProducto, precio):
        if session.get('user_id') != None:
            return render_template('login.html', user=session['user_id'])
        if request.method == 'GET':
            return render_template('index.html')
        
        name = request.form.get('u')
        passwd = request.form.get('password')
        
        for registro in Producto.query.all():
                id += 1
                if name == registro.nombre and passwd == registro.password:
                    flash("ERROR: Pon otro correo!")
                else:
                    session['user_id'] = name #definición de cookie de sesión.
                    return render_template('login.html', user=name)
        return redirect(url_for('login'))

    # def __str__(self):
    #     return f'Nombre completo: {self.nombre} {self.apellidoPat} {self.apellidoMat}\n - Id: {self.idComprador}\n - Correo: {self.correo}\n - Contraseña: {self.contrasena}\n - Teléfono: {self.telefono}\n'