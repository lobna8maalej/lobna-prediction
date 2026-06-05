import sys
import json
import pickle
import os

try:
    data = json.loads(sys.stdin.read())

    model_name = data.get("model", "carrefour").lower()

    file_map = {
        "carrefour": "carrefour.pkl",
        "aziza": "aziza.pkl"
    }

    if model_name not in file_map:
        raise Exception("Model not found")

    model_path = os.path.join(os.path.dirname(__file__), file_map[model_name])

    with open(model_path, "rb") as f:
        model = pickle.load(f)

    # sécurité
    if not hasattr(model, "predict"):
        raise Exception("Invalid ML model loaded")

    x1 = float(data["x1"])
    x2 = float(data["x2"])

    prediction = model.predict([[x1, x2]])[0]

    print(json.dumps({
        "success": True,
        "model": model_name,
        "prediction": float(prediction)
    }))

except Exception as e:
    print(json.dumps({
        "success": False,
        "error": str(e)
    }))