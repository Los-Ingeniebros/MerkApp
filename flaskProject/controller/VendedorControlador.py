from flask import Blueprint, request, render_template, flash, url_for
from alchemyClasses import db
from alchemyClasses.Vendedor import Vendedor

usuario_blueprint = Blueprint('usuario', __name__, url_prefix='/registrar')

# @usuario_blueprint.route('/', methods=['GET', 'POST'])
# def registrar_vendedor():

#     if request.method == 'GET':
#         return render_template('registra_usuario.html')
#     else:
#         nombre = request.form['nombre']
#         contrasenia = request.form['contrasenia']
#         print(nombre)
#         print(contrasenia)
#         id = 1
#         for registro in Vendedor.query.all():
#             id += 1
#             if nombre == registro.nombre:
#                 flash("ERROR: Pon otro nombre!")
#                 return render_template('registra_usuario.html')
#         usuario = Vendedor(id, nombre, contrasenia)
#         db.session.add(usuario)
#         print(usuario)
#         db.session.commit()        
#         flash("Usuario registrado!")
#         return render_template('index.html')