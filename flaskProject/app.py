from flask import Flask, redirect, render_template, url_for, request, flash, session, Blueprint

import json

from flask import Flask, redirect, render_template, url_for, request, flash, session, Response
from flask_cors import CORS

from alchemyClasses import db
from controller.catalogue import catalogue
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Vendedor import Vendedor
from alchemyClasses.Producto import Producto
from alchemyClasses.Comprar import Comprar

app = Flask(__name__)
app.register_blueprint(catalogue)
app.register_blueprint(usuario_blueprint)
app.config['SECRET_KEY'] = 'dev'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ing:Developer123!@localhost:3306/base_merkaap'
db.init_app(app)
CORS(app)

@app.route('/')
def inicioSesion():
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST', 'OPTIONS'])
def login(): 
    if request.method == 'OPTIONS':           
        res = Response()        
        res.headers['X-Content-Type-Options'] = '*'
        return res
    if session.get('user_id') != None:
        return render_template('login.html', user=session['user_id'])    
    if request.method == 'GET':        
        return render_template('index.html')
    boton = request.form.get('registrar')
  
    if boton == 'registrar':
        return redirect(url_for('usuario.registrar_usuario'))
    if request.method == 'POST':   
     
        correo = request.json['correo']
        contrasenia = request.json['contrasenia']        
        modo = request.json['modo']

        if modo == 'Vendedor':
            encontrado = Vendedor.query.filter(Vendedor.correo == correo, Vendedor.contrasenia == contrasenia).first()
        elif modo == 'Comprador':
            encontrado = Comprador.query.filter(Comprador.correo == correo, Comprador.contrasenia == contrasenia).first()
        else:
            flash('Invalid username or password')
            return json.dumps({'error':'Invalid username or password'})
        
        if encontrado:
            session['user_id'] = correo 
            return json.dumps({'nombre': encontrado.nombre, 'correo': encontrado.correo, 'contrasenia': encontrado.contrasenia, 'modo': modo})
        flash('Invalid username or password')
        return json.dumps({'error':'Invalid username or password'})
    
@app.route('/recuperar', methods=['GET', 'POST', 'OPTIONS'])
def recuperarVentas(): 
    if request.method == 'OPTIONS':                   
        res = Response()        
        res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'POST':
        correo = request.json[2]
        contrasenia = request.json[3]        
        vendedor = Vendedor.query.filter(Vendedor.correo == correo, Vendedor.contrasenia == contrasenia).first()
        diccionario = {}
        #lista = []
        for registro in Producto.query.filter(Producto.idVendedor == vendedor.idVendedor):
            #usuario = {registro.idUsuario:{ "nombre":f"{registro.nombre}", "contrasenia":f"{registro.contrasenia}"}}            
            venta = {registro.idProducto:[registro.nombre, registro.stock, registro.precio, registro.descripcion]}
            #usuario = [registro.idUsuario, registro.nombre, registro.contrasenia]
            #lista.append(usuario)
            diccionario.update(venta)    
        return json.dumps({'dic': diccionario})
        #exit(0)
        #lista = request.json['lista']
        
        #encontrado = Usuario.query.filter(Usuario.nombre == nombre, Usuario.contrasenia == contrasenia).first()
      
        #if encontrado: #Ustedes van a tener que cambiar esto, por una validación con la DB.
        #    session['user_id'] = nombre #definición de cookie de sesión.            
        #    return json.dumps({'nombre': nombre, 'contrasenia': contrasenia})
        #flash('Invalid username or password')
        #return json.dumps({'error':'Invalid username or password'})


@app.route('/eliminarVentas', methods=['GET', 'POST', 'OPTIONS'])
def eliminarVentas(): 
    if request.method == 'OPTIONS':                   
        res = Response()        
        res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'GET':                         
        return json.dumps({'hola': 'fin'})
    elif request.method == 'POST':
        lista_de_id = request.json
        for id in lista_de_id:
            venta = Producto.query.filter(Producto.idProducto == id).first()
            db.session.delete(venta)
            db.session.commit()
        return json.dumps({'listo':'usuario'})
    
@app.route('/agregarOpinion', methods=['GET', 'POST', 'OPTIONS'])
def agregarOpinion(): 
    if request.method == 'OPTIONS':                   
        res = Response()        
        #res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'POST':        
        usuario = request.json[0]
        opinion = request.json[1]
        
        id = 1
        for registro in Comprar.query.all():
            id += 1

        comprador = Comprador.query.filter(Comprador.correo == usuario[2], Comprador.contrasenia == usuario[3]).first()
        # El idProducto no cambia por el momento
        compra = Comprar(id, comprador.idComprador, 8, opinion[1], opinion[0])
        db.session.add(compra)
        db.session.commit()        
        return json.dumps({'listo':'usuario'})

@app.route('/logout')
def logout():
    session['user_id'] = None
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run()
