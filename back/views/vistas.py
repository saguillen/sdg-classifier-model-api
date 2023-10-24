from flask import request
from flask_jwt_extended import jwt_required, create_access_token, verify_jwt_in_request, get_jwt
from flask_restful import Resource
from datetime import datetime
from functools import wraps
from flask import jsonify
import hashlib
import json

from models import \
    db, Texts, \
    TextsSchema, \
    RFCmodel, \
    data_processing



    

class VistaTexts(Resource):
    def get(self):
        texts = Texts.query.all()
        texts = TextsSchema(many=True).dump(texts)
        return jsonify(texts)

    def post(self):
        text_to_process = request.json['texts']
        text_processed = RFCmodel().prediction(text_to_process) # esto es un dataframe
        text=text_processed.todict()
        texts = Texts(\
            text=text['text'],\
            sdg=text['sdg'],\
            palabras=text['palabras']\
        )
        #db.session.add(texts)
        #db.session.commit()
        return TextsSchema().dump(texts), 201
            

        text = TextsSchema().load(request.get_json())
        db.session.add(text)
        db.session.commit()
        return TextsSchema().dump(text), 201
    
    
    def prediction(self,data):
        return self.model.predict(data)


