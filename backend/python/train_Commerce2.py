from sklearn.svm import SVR
import pickle
import os

BASE_DIR = os.path.dirname(__file__)

# ================= DATA COMMUNE =================
X = [
    [10, 1],
    [20, 2],
    [30, 3],
    [40, 4]
]

# ================= CARREFOUR MODEL =================
y_carrefour = [120, 240, 360, 480]

carrefour_model = SVR()
carrefour_model.fit(X, y_carrefour)

with open(os.path.join(BASE_DIR, "carrefour.pkl"), "wb") as f:
    pickle.dump(carrefour_model, f)

print("Carrefour model saved")


# ================= AZIZA MODEL =================
y_aziza = [100, 200, 300, 400]

aziza_model = SVR()
aziza_model.fit(X, y_aziza)

with open(os.path.join(BASE_DIR, "aziza.pkl"), "wb") as f:
    pickle.dump(aziza_model, f)

print("Aziza model saved")