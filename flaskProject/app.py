from flask import Flask, redirect, render_template, url_for, request, flash, session, Response, jsonify
from flask_cors import CORS
from alchemyClasses import db
from controller.catalogue import catalogue
from alchemyClasses.Comprador import Comprador
from alchemyClasses.Vendedor import Vendedor
from alchemyClasses.Producto import Producto
from alchemyClasses.Comprar import Comprar
from alchemyClasses.Categoria import Categoria
from sqlalchemy.orm import aliased
import json

app = Flask(__name__)
app.register_blueprint(catalogue)
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
        
        id = 3
        for registro in Producto.query.all():
            id += 1

        vendedor = Vendedor.query.filter(Vendedor.nombre == usuario[1], Vendedor.correo == usuario[2]).first()
        
        b : bytearray = 123 #TODO: Cambiar por la imagen a colocar.

        producto = Producto(id, vendedor.idVendedor, venta[1], venta[0], venta[2], venta[3], venta[4], b)
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
        
        idCompra = 1
        for registro in Comprar.query.all():
            idCompra += 1

        idProducto = 1
        for registro in Producto.query.all():
            idProducto += 1

        comprador = Comprador.query.filter(Comprador.correo == usuario[2], Comprador.contrasenia == usuario[3]).first()
        if opinion[0] != '' and opinion[1] != '':
            compra = Comprar(idCompra, comprador.idComprador, idProducto, opinion[1], opinion[0])
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
    

@app.route('/buscar', methods=['GET'])
def buscar_productos():
    query = request.args.get('query', '')
    categoria_nombre = request.args.get('categoria', '')
    if query.isdigit():
        productos = Producto.query.filter(
            (Producto.idProducto == int(query)) |
            (Producto.idCategoria == int(query))
        ).all()
    else:
        productos = Producto.query.join(Categoria, Producto.idCategoria == Categoria.idCategoria).filter(
            (Producto.nombre.like(f'%{query}%')) |
            (Categoria.nombre.like(f'%{categoria_nombre}%') if categoria_nombre else True)
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

if __name__ == '__main__':
    app.run()