import pandas as pd
from sklearn.svm import SVR
import joblib

data = {
    'graduate_success_rate': [85, 85, 90],
    'event_duration': [2, 2, 2]
}

df = pd.DataFrame(data)

X = df[['event_duration']]
y = df['graduate_success_rate']

model = SVR(kernel='linear')
model.fit(X, y)

joblib.dump(model, 'EDUCATION_model.pkl')

print("Modèle enregistré avec succès")