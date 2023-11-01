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

    def post(self):
        texts_to_process = request.json['texts']
        texts_processed = RFCmodel().prediction(texts_to_process) # esto es un dataframe
        lista = []
        for text_to_process, text_processed in zip(texts_to_process, texts_processed):
            texts = Texts(\
                text=text_to_process,\
                sdg=text_processed,\
            )
            lista.append(TextsSchema().dump(texts))


        print(lista)
        #db.session.add(texts)
        #db.session.commit()
        return jsonify(texts=lista)
            
    
    
    def prediction(self,data):
        return self.model.predict(data)


