import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from joblib import dump, load
from .data_processing import processing
import json

class RFCmodel():
    model = load('data_pipelines/model.joblib')
    #data = pd.DataFrame()
    

    def prediction(self,data):
        #data_dict = json.loads(data)
        #print(data_dict)
        #df_data = pd.DataFrame(data=data_dict,columns=data_dict.keys(),index=0)
        df_data = pd.DataFrame(data=data,columns=['Textos_espanol'])
        df_final = processing(df_data)
        df_final['sdg'] = self.model.predict(df_final['palabras'])
        df_final.to_csv('data_pipelines/df_final.csv')
        #print(df_final['palabras'])
        prediction = self.model.predict(processing(df_data)['palabras'])
        print("PREDICCION: ",prediction)
        return prediction
"""    
    def predict(self, data):
        self.data = data
        return self.model.predict(data)
"""