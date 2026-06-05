import pickle
import json

# load model
with open("vetement.pkl", "rb") as f:
    model = pickle.load(f)

# input
value = 30

# prediction
result = model.predict([[value]])

# output JSON (important pour Node.js)
print(json.dumps({"prediction": float(result[0])}))