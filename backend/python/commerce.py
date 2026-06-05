# backend/python/commerce.py
import sys
import json
import pickle
import numpy as np
import os

BASE_DIR = os.path.dirname(__file__)
model = pickle.load(open(os.path.join(BASE_DIR, "../models/MG.pkl"), "rb"))

try:
    raw = sys.stdin.read()
    data = json.loads(raw)

    x = np.array([[float(data["Numbers"]), float(data["prix"])]])

    prediction = model.predict(x)[0]

    print(json.dumps({
        "success": True,
        "prediction": float(prediction)
    }))

except Exception as e:
    print(json.dumps({
        "success": False,
        "error": str(e)
    }))