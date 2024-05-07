from flask import Flask, redirect, render_template, url_for, request, flash, session, Response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from clases.Usuario import Usuario
import json

from clases import db

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ferfong:Develooper123!@localhost:3306/usuario'
db.init_app(app)
CORS(app)

@app.route('/login', methods=['GET', 'POST', 'OPTIONS'])
def login(): 
    if request.method == 'OPTIONS':           
        res = Response()
        return res
    if session.get('user_id') != None:
        return render_template('login.html', user=session['user_id'])    
    if request.method == 'GET':
        return render_template('index.html')
    boton = request.form.get('registrar')
  
    if boton == 'registrar':
        return redirect(url_for('usuario.registrar_usuario'))
    if request.method == 'POST':   
     
        nombre = request.json['nombre']
        contrasenia = request.json['contrasenia']        
        
        encontrado = Usuario.query.filter(Usuario.nombre == nombre, Usuario.contrasenia == contrasenia).first()
      
        if encontrado: #Ustedes van a tener que cambiar esto, por una validación con la DB.
            session['user_id'] = nombre #definición de cookie de sesión.            
            return json.dumps({'nombre': nombre, 'contrasenia': contrasenia})
        flash('Invalid username or password')
        return json.dumps({'error':'Invalid username or password'})