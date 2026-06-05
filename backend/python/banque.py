import sys
import json
import pickle
import os
import traceback

try:

    BASE_DIR = os.path.dirname(__file__)
    model_path = os.path.join(BASE_DIR, "BNA.pkl")

    model = pickle.load(open(model_path, "rb"))

    raw = sys.stdin.read().strip()

    print("RAW INPUT:", raw, file=sys.stderr)
    print("MODEL TYPE:", type(model), file=sys.stderr)

    input_data = json.loads(raw)

    X = [[
        float(input_data["x1"]),
        float(input_data["x2"])
    ]]

    result = model.predict(X)[0]

    print(json.dumps({
        "prediction": float(result)
    }))

except Exception as e:

    print(json.dumps({
        "error": str(e),
        "trace": traceback.format_exc()
    }))