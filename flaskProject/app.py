from flask import Flask, redirect, render_template, url_for, request, flash, session, Response
from flask_cors import CORS
from alchemyClasses import db
from controller.catalogue import catalogue
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Vendedor import Vendedor
from alchemyClasses.Producto import Producto
from alchemyClasses.Comprar import Comprar
from alchemyClasses.Categoria import Categoria
import json

app = Flask(__name__)
app.register_blueprint(catalogue)
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
        for registro in Producto.query.filter(Producto.idVendedor == vendedor.idVendedor):
            categoria = Categoria.query.filter(Categoria.idCategoria == registro.idCategoria).first()
            venta = {registro.idProducto:[registro.nombre, categoria.nombre, registro.precio , registro.stock]}
            diccionario.update(venta)    
        return json.dumps({'dic': diccionario})


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
            for registro in Comprar.query.filter(Comprar.idProducto == id).all():
                db.session.delete(registro)
                db.session.commit()
            db.session.delete(venta)
            db.session.commit()
        return json.dumps({'listo':'usuario'})
    
@app.route('/agregarOpinion', methods=['GET', 'POST', 'OPTIONS'])
def agregarOpinion(): 
    if request.method == 'OPTIONS':                   
        res = Response()        
        return res
    elif request.method == 'POST':        
        usuario = request.json[0]
        opinion = request.json[1]
        
        id = 1
        for registro in Comprar.query.all():
            id += 1

        comprador = Comprador.query.filter(Comprador.correo == usuario[2], Comprador.contrasenia == usuario[3]).first()
        # El idProducto no cambia por el momento, y se debe de poner un valor que exista en la base de datos
        if opinion[0] != '' and opinion[1] != '':
            compra = Comprar(id, comprador.idComprador, 10, opinion[1], opinion[0])
            db.session.add(compra)
            db.session.commit()        
        elif opinion[0] == '' and opinion[1] != '':
            compra = Comprar(id, comprador.idComprador, 10, opinion[1], 0)
            db.session.add(compra)
            db.session.commit()        
        elif opinion[0] != '' and opinion[1] == '':
            compra = Comprar(id, comprador.idComprador, 10, opinion[1], opinion[0])
            db.session.add(compra)
            db.session.commit()                
        return json.dumps({'listo':'usuario'})

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))


if __name__ == '__main__':
    app.run()