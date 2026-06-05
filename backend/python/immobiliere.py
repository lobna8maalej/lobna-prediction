import sys
import json
import pickle
import numpy as np
import os

try:

    print("START PYTHON", file=sys.stderr)

    # lire input Node
    data = json.load(sys.stdin)
    print("INPUT:", data, file=sys.stderr)

    value = data.get("value")

    if value is None:
        raise ValueError("value manquante")

    X_test = np.array([[float(value)]])

    # vérifier fichiers modèles AVANT load
    if not os.path.exists("model_AROUS.pkl"):
        raise FileNotFoundError("model_AROUS.pkl introuvable")

    if not os.path.exists("model_gamma.pkl"):
        raise FileNotFoundError("model_gamma.pkl introuvable")

    # charger modèles
    with open('model_AROUS.pkl', 'rb') as f:
        model_arous = pickle.load(f)

    with open('model_gamma.pkl', 'rb') as f:
        model_gamma = pickle.load(f)

    # prédictions
    prediction_arous = model_arous.predict(X_test)
    prediction_gamma = model_gamma.predict(X_test)

    result = {
        "status": "ok",
        "input": value,
        "arous": prediction_arous.tolist(),
        "gamma": prediction_gamma.tolist()
    }

    print(json.dumps(result))

except Exception as e:

    print(json.dumps({
        "status": "error",
        "message": str(e)
    }))