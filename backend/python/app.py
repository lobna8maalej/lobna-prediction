import sys
import pickle
import json
import os

BASE_DIR = os.path.dirname(__file__)

mode = sys.argv[1]
value = float(sys.argv[2])

try:

    if mode == "ncg":

        model_path = os.path.join(BASE_DIR, "NCG_model.pkl")

        with open(model_path, "rb") as f:
            model = pickle.load(f)

        prediction = model.predict([[value]])

        result = {
            "model": "ncg",
            "input": value,
            "prediction": float(prediction[0])
        }

    elif mode == "facture":

        model_path = os.path.join(BASE_DIR, "FACTURE.pkl")

        with open(model_path, "rb") as f:
            model = pickle.load(f)

        prediction = model.predict([[value]])

        result = {
            "model": "facture",
            "input": value,
            "prediction": float(prediction[0])
        }

    else:
        result = {"error": "mode must be ncg or facture"}

except Exception as e:
    result = {"error": str(e)}

print(json.dumps(result))