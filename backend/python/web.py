import sys
import json
import pickle
import os

try:
    # 📌 chemin du modèle
    BASE_DIR = os.path.dirname(__file__)
    model_path = os.path.join(BASE_DIR, "WUBIK.pkl")

    # 📌 check fichier
    if not os.path.exists(model_path):
        print(json.dumps({"error": "Model not found"}))
        sys.exit(1)

    # 📌 load model
    with open(model_path, "rb") as f:
        model = pickle.load(f)

    # 📌 read input from Node
    raw_input = sys.stdin.read().strip()

    if not raw_input:
        print(json.dumps({"error": "No input received"}))
        sys.exit(1)

    input_data = json.loads(raw_input)

    # 📌 validation
    if "x1" not in input_data or "x2" not in input_data:
        print(json.dumps({"error": "Missing x1 or x2"}))
        sys.exit(1)

    x1 = float(input_data["x1"])
    x2 = float(input_data["x2"])

    # 📌 prediction
    X = [[x1, x2]]
    result = model.predict(X)[0]

    # 📌 output JSON ONLY
    print(json.dumps({
        "prediction": float(result)
    }))

except Exception as e:
    print(json.dumps({
        "error": str(e)
    }))
    sys.exit(1)