from sklearn.svm import SVR
import pickle

X = [[10, 1], [20, 2], [30, 3]]
y = [100, 200, 300]

model = SVR()
model.fit(X, y)

with open("BNA.pkl", "wb") as f:
    pickle.dump(model, f)

print("MODEL SAVED")