import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
from joblib import dump, load
from .data_processing import *
import json

class RFCmodel():
    model = load('data_pipelines/model.joblib')
    #data = pd.DataFrame()
    

    def prediction(self,data):
        data_dict = json.loads(data)
        df_data = pd.DataFrame(data=data_dict,columns=data_dict.keys(),index=0)
        return self.model.predict(data_processing.processing(df_data))
"""    
    def predict(self, data):
        self.data = data
        return self.model.predict(data)
"""