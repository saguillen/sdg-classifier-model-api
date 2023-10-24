# Instalación de librerias
import pandas as pd
import numpy as np
import sys
#from ydata_profiling import ProfileReport

import re, string, unicodedata
#import contractions
import inflect
from nltk import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import LancasterStemmer, WordNetLemmatizer
import nltk
from nltk import SnowballStemmer
import spacy
from sklearn.model_selection import train_test_split,GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer, HashingVectorizer
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.svm import SVC
from sklearn.ensemble import BaggingClassifier, RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import BernoulliNB

from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from sklearn.metrics import classification_report, confusion_matrix, precision_score, recall_score, f1_score, accuracy_score

from sklearn.base import BaseEstimator, ClassifierMixin

import matplotlib.pyplot as plt


# Punkt permite separar un texto en frases.
nltk.download('punkt')
# Descarga todas las palabras vacias, es decir, aquellas que no aportan nada al significado del texto
nltk.download('stopwords')
# Descarga de paquete WordNetLemmatizer, este es usado para encontrar el lema de cada palabra
nltk.download('wordnet')
#Corrige los caracteres mal codificados de cada palabra importados en el xlsx
def corregir_caracteres_mal_codificados(words):
    new_words = []
    for word in words:
      #print(word)
      #word.encode('utf-8').strip()
      try:     # Intenta decodificar el texto utilizando UTF-8
        new_word = word.encode('Windows-1252').decode('utf-8')
        new_words.append(new_word)
      except: # En caso de que no se pueda decodificar, se deja la palabra para ser tratada con los otros metodos
        new_word = word
        new_words.append(new_word)
    return new_words

def remove_non_ascii(words):
    """Remove non-ASCII characters from list of tokenized words"""
    new_words = []
    for word in words:
        new_word = unicodedata.normalize('NFKD', word).encode('ascii', 'ignore').decode('utf-8', 'ignore')
        new_words.append(new_word)
    return new_words

def remove_punctuation(words):
    """Remove punctuation from list of tokenized words"""
    new_words = []
    for word in words:
        new_word = re.sub(r'[^\w\s]', '', word)
        if new_word != '':
            new_words.append(new_word)
    return new_words

def replace_numbers(words):
    """Replace all interger occurrences in list of tokenized words with textual representation"""
    p = inflect.engine()
    new_words = []
    for word in words:
        if not word.isdigit():
            new_words.append(word)
        #if word.isdigit():
            #new_word = p.number_to_words(word)
            #new_words.append(new_word)
        #else:
            #new_words.append(word)
    return new_words
def to_lowercase(words):
    """Convert all characters to lowercase from list of tokenized words"""
    new_words = []
    for word in words:
        new_words.append(word.lower())
    return new_words

def remove_stopwords(words):
    """Remove stop words from list of tokenized words"""
    new_words = []
    stop_words = set(stopwords.words('spanish'))
    for word in words:
        if word not in stop_words:
            new_words.append(word)
    return new_words

def preprocessing(words):
    words = corregir_caracteres_mal_codificados(words) # Aplicación de la función para transformar los acentos
    words = to_lowercase(words)
    words = replace_numbers(words)
    words = remove_punctuation(words)
    words = remove_non_ascii(words)
    words = remove_stopwords(words)
    return words

#textos['palabras'] = textos['Textos_espanol'].apply(word_tokenize).apply(preprocessing) #Aplica la eliminación del ruido


spanishstemmer=SnowballStemmer('spanish')
#text = “””Soy un texto que pide a gritos que lo procesen. Por eso yo canto, tú cantas, ella canta, nosotros cantamos, cantáis, cantan…”””
#tokens = normalize(text) # crear una lista de tokens
#stems = [spanishstemmer.stem(token) for token in tokens]

def stem_words(words):
    """Stem words in list of tokenized words"""
    spanishstemmer=SnowballStemmer('spanish')
    #lancaster=LancasterStemmer()
    new_words =[]
    for word in words:
        new_words.append(spanishstemmer.stem(word))
        #new_words.append(lancaster.stem(word))
    return new_words

#nlp = spacy.load('es_core_news_sm')
#text = "Soy un texto que pide a gritos que lo procesen. Por eso yo canto, tú cantas, ella canta, nosotros cantamos, cantáis, cantan…"
#doc = nlp(text)
#lemmas = [tok.lemma_.lower() for tok in doc]
#print(lemmas)

def lemmatize_verbs(words):
    """Lemmatize verbs in list of tokenized words"""
    nlp = spacy.load('es_core_news_sm')

    #lematizador = LematizadorSpacy('es')
    #for t in textos:
    #  print(lematizar_texto(t, lematizador=lematizador))

    #lemmatizer = WordNetLemmatizer()
    new_words =[]
    for word in words:
        doc = nlp(word)
        #print(doc[0].lemma_.lower())
        new_words.append(doc[0].lemma_.lower())
        #new_words.append(lemmatizer.lemmatize(word))
    return new_words

def delete_duplicates(words):
    rta = list(set(words))
    return rta

def stem_and_lemmatize(words):
    stems = stem_words(words)
    lemmas = lemmatize_verbs(words)
    total = stems + lemmas
    #print(total)
    return delete_duplicates(total)

#textos['palabras'] = textos['palabras'].apply(stem_and_lemmatize) #Aplica lematización y Eliminación de Prefijos y Sufijos.

def processing(text:pd.DataFrame(),y=None):
    text['palabras'] = text['Textos_espanol'].apply(word_tokenize).apply(preprocessing) #Aplica la eliminación del ruido
    text['palabras'] = text['palabras'].apply(stem_and_lemmatize) #Aplica lematización y Eliminación de Prefijos y Sufijos. 
    return text