from flask import Flask
from flask_restful import Api
from modelos import db


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///db_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'mojo-dojo-casa-house'
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SQLALCHEMY_ECHO'] = True

api = Api(app)

#db.init_app(app)
#db.create_all()

api = Api(app)

#api.add_resource(VistaSignIn, '/signin')


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/modelos')
def sexo():
    return 'sexo la pelicula'