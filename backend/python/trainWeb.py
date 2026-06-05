from sklearn.svm import SVR
import pandas as pd
import pickle

data = {
    "x1": [10, 20, 30, 40],
    "x2": [1, 2, 3, 4],
    "y": [100, 200, 300, 400]
}

df = pd.DataFrame(data)

X = df[["x1", "x2"]]
y = df["y"]

model = SVR(kernel="linear")
model.fit(X, y)

with open("WUBIK.pkl", "wb") as f:
    pickle.dump(model, f)

print("MODEL CREATED SUCCESSFULLY")