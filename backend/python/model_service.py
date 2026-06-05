import sys
import json
import pickle
import numpy as np
import os
import traceback
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

# ==========================
# Création du modèle si absent
# ==========================
if not os.path.exists(MODEL_PATH):
    try:
        print("Creating model...", file=sys.stderr)

        X, y = make_classification(
            n_samples=200,
            n_features=20,
            n_informative=10,
            n_redundant=0,
            n_classes=3,
            random_state=42
        )

        X_train, X_test, y_train, y_test = train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42
        )

        model = xgb.XGBClassifier(
            objective="multi:softprob",
            num_class=3,
            eval_metric="mlogloss"
        )

        model.fit(X_train, y_train)

        with open(MODEL_PATH, "wb") as f:
            pickle.dump(model, f)

        print(json.dumps({
            "success": True,
            "message": "Model trained and saved"
        }))

        sys.exit(0)

    except Exception as e:
        print(json.dumps({
            "success": False,
            "error": str(e),
            "traceback": traceback.format_exc()
        }))
        sys.exit(1)

# ==========================
# Prédiction
# ==========================
try:

    print(f"Loading model from: {MODEL_PATH}", file=sys.stderr)

    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)

    raw = sys.stdin.read().strip()

    print(f"Received input: {raw}", file=sys.stderr)

    if not raw:
        raise ValueError("No JSON data received")

    data = json.loads(raw)

    if "features" not in data:
        raise ValueError("features field missing")

    features = data["features"]

    if not isinstance(features, list):
        raise ValueError("features must be a list")

    if len(features) != 20:
        raise ValueError(
            f"Expected 20 features but received {len(features)}"
        )

    features = np.array(
        [[float(x) for x in features]],
        dtype=np.float32
    )

    probabilities = model.predict_proba(features)[0]

    prediction = int(np.argmax(probabilities))
    confidence = float(np.max(probabilities))

    print(json.dumps({
        "success": True,
        "prediction": prediction,
        "confidence": round(confidence, 4),
        "percentage": round(confidence * 100, 2)
    }))

except Exception as e:
    print(json.dumps({
        "success": False,
        "error": str(e),
        "traceback": traceback.format_exc()
    }))
    sys.exit(1)