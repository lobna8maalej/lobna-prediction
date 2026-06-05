import os
import pickle
import json
import sys
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
models = {}

files = {
    "info2": "INFO2.pkl",
    "info3": "INFO3.pkl",
    "gomycode": "gomycode.pkl"
}

# LOAD MODELS
for key, file in files.items():
    path = os.path.join(BASE_DIR, file)
    if not os.path.exists(path):
        raise Exception(f"Missing model file: {path}")
    with open(path, "rb") as f:
        models[key] = pickle.load(f)

# CHECK INPUT
if len(sys.argv) < 2:
    raise Exception("Missing input data from Node.js")

# ⚠️ Forcer tableau 2D pour scikit-learn
input_data = np.array([json.loads(sys.argv[1])], dtype=float)

if np.isnan(input_data).any():
    raise Exception(f"Invalid input received: {input_data}")

# PREDICTIONS
try:
    result = {
        "info2_pred": float(models["info2"].predict(input_data)[0]),
        "info3_pred": float(models["info3"].predict(input_data)[0]),
        "gomycode_pred": float(models["gomycode"].predict(input_data)[0])
    }

    # Logs lisibles sur stderr (console)
    sys.stderr.write("\n=== Résultats de prédiction ===\n")
    for key, value in result.items():
        sys.stderr.write(f"{key}: {value:.4f}\n")
    sys.stderr.write("==============================\n\n")

    # Sortie JSON pour Node.js
    print(json.dumps(result))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
