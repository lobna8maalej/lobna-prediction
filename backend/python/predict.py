import sys
import os
import pickle
import numpy as np

# ======================
# LOAD MODEL (safe path)
# ======================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "eduworld.pkl")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

# ======================
# INPUT VALUES
# ======================
try:
    values = list(map(float, sys.argv[1:]))
except:
    print("error: invalid input format")
    sys.exit()

# ======================
# VALIDATION FEATURES
# ======================
expected_features = model.n_features_in_

if len(values) != expected_features:
    print(f"error: expected {expected_features} features, got {len(values)}")
    sys.exit()

# ======================
# PREDICTION
# ======================
X = np.array([values])
prediction = model.predict(X)

print(float(prediction[0]))