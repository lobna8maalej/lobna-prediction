# train_commerce.py
import pickle
import pandas as pd
from xgboost import XGBClassifier

# DATA
data = {
    'Numbers': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'prix': [42, 59, 33.5, 44, 49, 149, 99, 40.59, 250, 349]
}

df = pd.DataFrame(data)

X = df[['Numbers', 'prix']]
y = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]

# MODEL (plus stable)
model = XGBClassifier(
    use_label_encoder=False,
    eval_metric="logloss"
)

model.fit(X, y)

# SAVE PKL
with open("MG.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model saved successfully")