from flask import Flask, redirect, render_template, url_for, request, flash, session, Response
from flask_cors import CORS
from alchemyClasses import db
from controller.catalogue import catalogue
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Vendedor import Vendedor
from alchemyClasses.Producto import Producto
from alchemyClasses.Comprar import Comprar
from alchemyClasses.Categoria import Categoria

from hashlib import sha256
import smtplib
from email.message import EmailMessage
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ferfong:Develooper123!@localhost:3306/base_merkaap'
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
        contrasenia = sha256((request.json['contrasenia']).encode('utf-8')).hexdigest()    
        modo = request.json['modo']
        
        if modo == 'Vendedor':
            encontrado = Vendedor.query.filter(Vendedor.correo == correo, Vendedor.contrasenia == contrasenia).first()
        elif modo == 'Comprador':
            encontrado = Comprador.query.filter(Comprador.correo == correo, Comprador.contrasenia == contrasenia).first()
        else:
            flash('Invalid username or password')
            return json.dumps({'error':'Invalid username or password'})
        
        if encontrado:
            # session['user_id'] = correo
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

@app.route('/register',  methods=['GET', 'POST'])
def register():
    if session.get('user') == None:
        print("Pendientes")
        print(session.get('user'))
        # return render_template('login.html', user=session['user'])   
    if request.method == 'GET':        
        return render_template('index.html')
    if request.method == 'POST':
        nombre = request.json['nombre']
        apellido = request.json['apellido']
        rol = request.json['rol']
        numero = request.json['numero']
        correo = request.json['correo']
        contrasenia = request.json['contrasenia']
        contra = sha256(contrasenia.encode('utf-8')).hexdigest()
        print("asulito")

        if(rol == 'Vendedor'):
            correo1 = Vendedor.query.filter_by(correo=correo).first()
            if correo1:
                return json.dumps({'error':'correo repetido'})
                # return json.dumps({'listo':nombre, 'correo':correo}) sha256(cipher("Developer123#")).hexdigest())  
            nuevo_usuario = Vendedor(nombre,apellido,"",contra,numero,correo)
        else:
            correo1 = Comprador.query.filter_by(correo=correo).first()
            if correo1:
                return json.dumps({'error':'correo repetido'})
            nuevo_usuario = Comprador(nombre,apellido,"",contra,numero,correo)
        
        # Información del correo
        correo_merkapp = "merkapp.online@gmail.com"
        # Debería ser una contraseña de aplicación o una contraseña segura
        contra_merkapp = "edlu ylzl vbrw ugzf"  

        msg = EmailMessage()
        msg["Subject"] = "Datos de la cuenta de MerkApp"
        msg["From"] = correo_merkapp
        msg["To"] = correo
        msg.set_content(f"Hola, {nombre}, te damos la bienvenida a nuestro sistema web.\n\nEl registro de tu cuenta de accesso fue exitoso.\n\nTu contraseña es {contrasenia}\n\nSaludos :D")

        try:
            # Usar SMTP_SSL si el puerto es 465
            with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
                smtp.login(correo_merkapp, contra_merkapp)
                print(f"Enviando correo a {correo}")
                smtp.send_message(msg)
                print(f"Correo enviado a {correo}")
        except smtplib.SMTPException as e:
            print(f"Error al enviar el correo a {correo}: {e}")
        db.session.add(nuevo_usuario)
        db.session.commit()
        return json.dumps({'listo':nombre, 'correo':correo})

if __name__ == '__main__':
    app.run()