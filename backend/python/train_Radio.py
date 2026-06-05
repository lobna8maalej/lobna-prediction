import pickle
from sklearn.ensemble import RandomForestRegressor


X_train = [[1], [2], [3], [4]]
y_train = [10, 20, 30, 40]

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


with open("diwan.pkl", "wb") as f:
    pickle.dump(model, f)

print("MODEL TRAINED AND SAVED")