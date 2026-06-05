import pickle
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([
    [1, 10],
    [2, 20],
    [3, 30],
    [4, 40]
])

y = np.array([15, 25, 35, 45])

model = LinearRegression()
model.fit(X, y)

with open("MENTION.pkl", "wb") as f:
    pickle.dump(model, f)