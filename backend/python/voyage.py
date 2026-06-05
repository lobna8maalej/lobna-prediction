import sys
import json
import pickle
import numpy as np
import os
import warnings

warnings.filterwarnings("ignore")

BASE_DIR = os.path.dirname(__file__)
model_path = os.path.join(BASE_DIR, "voyagito.pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)

raw_input = sys.stdin.read().strip()
input_data = json.loads(raw_input)

prix2 = float(input_data["prix_concurrent_2"])
prix_agence2 = float(input_data["prix_concurrent_agence2"])
prix3 = float(input_data["prix_extra"])

X = np.array([[prix2, prix_agence2, prix3]])
prediction = model.predict(X)[0]

print(json.dumps({
    "prediction": float(prediction)
}))