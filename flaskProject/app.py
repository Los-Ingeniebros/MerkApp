from flask import Flask, redirect, render_template, url_for, request, flash, session, Response, jsonify
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
from sqlalchemy.orm import aliased
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/base_merkaap'
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
    
@app.route('/recuperarVentas', methods=['GET', 'POST', 'OPTIONS'])
def recuperarVentas(): 
    if request.method == 'OPTIONS':
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'POST':
        print(request.json)
        #exit(0)
        correo = request.json[2]
        contrasenia = request.json[3]
        vendedor = Vendedor.query.filter(Vendedor.correo == correo, Vendedor.contrasenia == contrasenia).first()
        diccionario = {}
        for registro in Producto.query.filter(Producto.idVendedor == vendedor.idVendedor):
            categoria = Categoria.query.filter(Categoria.idCategoria == registro.idCategoria).first()
            venta = {registro.idProducto:[registro.nombre, categoria.nombre, registro.precio , registro.stock]}
            diccionario.update(venta)
        return json.dumps({'dic': diccionario})

@app.route('/recuperarCategorias', methods=['GET', 'POST', 'OPTIONS'])
def recuperarCategorias():
    if request.method == 'OPTIONS':
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'POST':
        categorias = Categoria.query.all()
        diccionario = {}
        for registro in categorias:
            categoria = {registro.idCategoria : registro.nombre}
            diccionario.update(categoria)
        return json.dumps({'cat': diccionario})

@app.route('/crearVenta', methods=['GET', 'POST', 'OPTIONS'])
def crearVenta():
    if request.method == 'OPTIONS':
        res = Response()
        return res
    elif request.method == 'POST':
        usuario = request.json[0]
        venta = request.json[1]
        
        max_id = db.session.query(db.func.max(Producto.idProducto)).scalar()
        if max_id is None:
            max_id = 0
        
        nuevo_id = max_id + 1

        id = 1
        for registro in Producto.query.all():
            id += 1

        vendedor = Vendedor.query.filter(Vendedor.nombre == usuario[1], Vendedor.correo == usuario[2]).first()
        
        b : bytearray = 123 #TODO: Cambiar por la imagen a colocar.

        producto = Producto(nuevo_id, vendedor.idVendedor, venta[1], venta[0], venta[2], venta[3], venta[4], b)
        db.session.add(producto)
        db.session.commit()
        
        return json.dumps({'listo':'usuario'})


@app.route('/modificarVenta', methods=['PUT'])
def modificar_venta():
    updated_venta = request.json
    
    print("Venta actualizada:", updated_venta)
    
    producto = Producto.query.filter_by(idProducto=updated_venta['idProducto']).first()
    
    if producto:
        producto.nombre = updated_venta['nombre']
        producto.idCategoria = updated_venta['idCategoria']
        producto.descripcion = updated_venta['descripcion']
        producto.precio = updated_venta['precio']
        producto.stock = updated_venta['stock']
        
        db.session.commit()
        return jsonify({'message': 'Venta modificada con éxito'})
    else:
        return jsonify({'error': 'Producto no encontrado'}), 404 

@app.route('/eliminarVentas', methods=['GET', 'POST', 'OPTIONS'])
def eliminarVentas():
    if request.method == 'OPTIONS':
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'GET':
        return json.dumps({'hola': 'fin'})
    elif request.method == 'POST':
        lista_de_id = request.jso
        print(lista_de_id)
        for id in lista_de_id:
            venta = Producto.query.filter(Producto.idProducto == id).first()
            if(Comprar.query.filter(Comprar.idProducto == id).first()):
                for registro in Comprar.query.filter(Comprar.idProducto == id).all():
                    db.session.delete(registro)
                    db.session.commit()
            db.session.delete(venta)
            db.session.commit()
        id = 1
        for registro in Producto.query.all():
            registro.idProducto = id
            db.session.commit()
            id += 1
        return json.dumps({'listo':'usuario'})

@app.route('/recuperarProductos', methods=['GET', 'POST', 'OPTIONS'])
def recuperarProductos(): 
    if request.method == 'OPTIONS':
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'GET':
        diccionario = {}
        for registro in Producto.query.all():
            categoria = Categoria.query.filter(Categoria.idCategoria == registro.idCategoria).first()
            producto = {registro.idProducto:[registro.nombre, categoria.nombre, registro.precio , registro.stock]}
            diccionario.update(producto)
        return json.dumps({'dic': diccionario})

@app.route('/recuperarProducto', methods=['GET', 'POST', 'OPTIONS'])
def recuperarProducto():
    if request.method == 'OPTIONS':
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res
    elif request.method == 'POST':
        id = request.json
        producto = Producto.query.filter(Producto.idProducto == id).first()
        categoria = Categoria.query.filter(Categoria.idCategoria == producto.idCategoria).first()
        vendedor = Vendedor.query.filter(Vendedor.idVendedor == producto.idVendedor).first()
        comentarios = []
        for comentario in Comprar.query.filter(Comprar.idProducto == producto.idProducto).all():
            comprador = Comprador.query.filter(Comprador.idComprador == comentario.idComprador).first()
            comentarios.append([comentario.calificacion, comprador.nombre, comentario.comentario])
        producto = {producto.idProducto:[producto.nombre, categoria.nombre, producto.precio , producto.stock, comentarios, vendedor.nombre, vendedor.apellidoPat, vendedor.correo, vendedor.telefono]}
        return json.dumps({'producto': producto})

@app.route('/agregarOpinion', methods=['GET', 'POST', 'OPTIONS'])
def agregarOpinion():
    if request.method == 'OPTIONS':
        res = Response()
        return res
    elif request.method == 'POST':
        usuario = request.json[0]['user']
        opinion = request.json[1]
        idProducto = request.json[2]

        id = 1
        for registro in Comprar.query.all():
            id += 1
        
        comprador = Comprador.query.filter(Comprador.correo == usuario[2], Comprador.contrasenia == usuario[3]).first()

        if opinion[0] != '' and opinion[1] != '':
            compra = Comprar(id, comprador.idComprador, int(idProducto), opinion[1], opinion[0])
            db.session.add(compra)
            db.session.commit()
        elif opinion[0] == '' and opinion[1] != '':
            compra = Comprar(id, comprador.idComprador, int(idProducto), opinion[1], 0)
            db.session.add(compra)
            db.session.commit()
        elif opinion[0] != '' and opinion[1] == '':
            compra = Comprar(id, comprador.idComprador, int(idProducto), opinion[1], opinion[0])
            db.session.add(compra)
            db.session.commit()
        return json.dumps({'Op':[opinion[0],opinion]})
    
@app.route('/comprarProducto', methods=['GET', 'POST', 'OPTIONS'])
def comprarProducto():
    if request.method == 'OPTIONS':
        res = Response()
        return res
    elif request.method == 'POST':
        id = request.json[0]
        usuario = request.json[1]
        correo = usuario[0][1][2]
        producto = Producto.query.filter(Producto.idProducto == id).first()
        vendedor = Vendedor.query.filter(Vendedor.idVendedor == producto.idVendedor).first()
        producto.stock = producto.stock - 1
        if producto.stock >= 0:
            db.session.commit()
            # Información del correo
            correo_merkapp = "merkapp.online@gmail.com"
            # Debería ser una contraseña de aplicación o una contraseña segura
            contra_merkapp = "edlu ylzl vbrw ugzf"

            msg = EmailMessage()
            msg["Subject"] = "¡Compra exitosa!"
            msg["From"] = correo_merkapp
            msg["To"] = correo
            msg.set_content(f"Estimado(a) {usuario[0][1][1]},\n\nNos complace informarte que tu compra en MerkApp ha sido procesada con éxito.\nDetalles de la compra:\n - Producto: {producto.nombre}\n - Total: ${producto.precio}.00\n\nEn las próximas horas, el vendedor {vendedor.nombre} se pondrá en contacto contigo para coordinar los detalles de la entrega de tu pedido.\nRecuerda que puedes comunicarte directamente con el vendedor a través de correo electrónico = {vendedor.correo} o teléfono = {vendedor.telefono} para cualquier duda o consulta sobre tu compra.\n\nAgradecemos tu confianza en MerkApp y esperamos que disfrutes de tu nueva adquisición.\n\nAtentamente, MerkApp")

            try:
                # Usar SMTP_SSL si el puerto es 465
                with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
                    smtp.login(correo_merkapp, contra_merkapp)
                    print(f"Enviando correo")
                    smtp.send_message(msg)
                    print(f"Correo enviado")
            except smtplib.SMTPException as e:
                return json.dumps({'error': 'No se envió correo'})
            if producto.stock == 0:
                db.session.delete(producto)
                db.session.commit()
            return json.dumps({'listo':'usuario'})
        else:
            return json.dumps({'error': 'Inventario vació'})

@app.route('/buscar', methods=['GET'])
def buscar_productos():
    query = request.args.get('query', '')
    if query.isdigit():
        productos = Producto.query.filter(
            (Producto.idProducto == int(query))
        ).all()
    else:
        categoria_alias = aliased(Categoria)
        productos = Producto.query.join(categoria_alias, Producto.idCategoria == categoria_alias.idCategoria).filter(
            (Producto.nombre.like(f'%{query}%')) |
            (categoria_alias.nombre.like(f'%{query}%'))
        ).all()
    
    resultados = [
        {
            'idProducto': p.idProducto,
            'idVendedor': p.idVendedor,
            'idCategoria': p.idCategoria,
            'nombre': p.nombre,
            'descripcion': p.descripcion,
            'precio': p.precio,
            'stock': p.stock
        } for p in productos
    ]
    return jsonify(resultados)

@app.route('/categorias', methods=['GET'])
def obtener_categorias():
    categorias = Categoria.query.all()
    resultados = [{'idCategoria': c.idCategoria, 'nombre': c.nombre} for c in categorias]
    return jsonify(resultados)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/register',  methods=['GET', 'POST'])
def register():
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
        

        if(rol == 'Vendedor'):
            correo1 = Vendedor.query.filter_by(correo=correo).first()
            if correo1:
                return json.dumps({'error':'correo repetido'})
            
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
                print(f"Enviando correo")
                smtp.send_message(msg)
                print(f"Correo enviado")
        except smtplib.SMTPException as e:
            print(f"Error al enviar el correo a {correo}: {e}")

        db.session.add(nuevo_usuario)
        db.session.commit()
        return json.dumps({'listo':nombre, 'correo':correo})

if __name__ == '__main__':
    app.run()