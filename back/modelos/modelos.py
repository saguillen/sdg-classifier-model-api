from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields, Schema
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from sqlalchemy.ext.declarative import declarative_base

db = SQLAlchemy()
Base = declarative_base()

