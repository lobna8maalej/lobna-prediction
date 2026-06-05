import sys
import json
import pickle
import numpy as np

try:
    # Charger le modèle
    with open("python/MENTION.pkl", "rb") as f:
        model = pickle.load(f)

    # Lire les données envoyées par Node.js
    raw = sys.stdin.read().strip()
    data = json.loads(raw)

    if "a" not in data or "b" not in data:
        print(json.dumps({
            "success": False,
            "message": "Fields a and b are required"
        }))
        sys.exit()

    a = float(data["a"])
    b = float(data["b"])

    X = np.array([[a, b]])

    prediction = model.predict(X)[0]

    print(json.dumps({
        "success": True,
        "prediction": float(prediction)
    }))

except Exception as e:
    print(json.dumps({
        "success": False,
        "error": str(e)
    }))