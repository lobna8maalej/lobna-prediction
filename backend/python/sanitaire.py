from joblib import load
import numpy as np
import sys
import os
import json

BASE_DIR = os.path.dirname(__file__)

model = load(os.path.join(BASE_DIR, "CASA.pkl"))

# arguments
values = list(map(float, sys.argv[2:]))

# input
X = np.array([values])

# DEBUG
print("VALUES =", values)
print("SHAPE =", X.shape)
print("FEATURES =", model.n_features_in_)

# prediction
prediction = model.predict(X)

# output
print(json.dumps({
    "model": "CASA",
    "prediction": float(prediction[0]),
    "values": values
}))