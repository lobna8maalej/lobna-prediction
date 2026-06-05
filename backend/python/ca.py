import sys
import json
import pickle
import os

mode = sys.argv[1]
ca_tnd = float(sys.argv[2])
ca_eur = float(sys.argv[3])

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "EXPORT.pkl")

model = pickle.load(open(model_path, "rb"))

prediction = model.predict([[ca_tnd, ca_eur]])

result = {
    "mode": mode,
    "ca_tnd": ca_tnd,
    "ca_eur": ca_eur,
    "prediction": float(prediction[0])
}

print(json.dumps(result))