from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields, Schema
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.ext.declarative import declarative_base

db = SQLAlchemy()
Base = declarative_base()

class Texts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200))


class TextsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Texts
        include_relationships = True
        include_fk = True
        load_instance = True
    id = fields.String()
    text = fields.String()
