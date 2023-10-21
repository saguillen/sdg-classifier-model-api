from flask import request
from flask_jwt_extended import jwt_required, create_access_token, verify_jwt_in_request, get_jwt
from flask_restful import Resource
from datetime import datetime
from functools import wraps
from flask import jsonify
import hashlib
import json

from modelos import \
    db, Texts, \
    TextsSchema
    

class VistaTexts(Resource):
    def get(self):
        texts = Texts.query.all()
        texts = TextsSchema(many=True).dump(texts)
        return jsonify(texts)

    def post(self):
        text = TextsSchema().load(request.get_json())
        db.session.add(text)
        db.session.commit()
        return TextsSchema().dump(text), 201


