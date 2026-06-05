import os
import pickle
import json

# 📁 Chemin sécurisé vers le modèle
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "diwan.pkl")

# 🤖 Chargement du modèle
try:
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
except Exception as e:
    print("Erreur chargement modèle:", str(e))
    model = None

# 📊 Résultat (simulation ou prédiction)
result = {
    "status": "success" if model else "error",
    "prediction": 123.4,  # ici tu peux remplacer par model.predict(...)
    "rows": [
        {
            "reputation_ranking": 80,
            "tuition_fee": 5000,
            "Target": 1
        }
    ],
    "columns": ["reputation_ranking", "tuition_fee", "Target"],
    "images": []
}

# 📤 Affichage JSON
print(json.dumps(result))