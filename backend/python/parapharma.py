import pickle

def save_pickle(objet, nom_fichier):
    with open(nom_fichier, 'wb') as f:
        pickle.dump(objet, f)
    print(f"✔ Sauvegardé dans {nom_fichier}")


# ======================
# TES DEUX MODELS
# ======================

data_biodream = {
    "score": 0.92,
    "type": "biodream_model"
}

data_bonheur = {
    "score": 0.88,
    "type": "bonheur_model"
}

# ======================
# SAVE PKL
# ======================

save_pickle(data_biodream, "biodream.pkl")
save_pickle(data_bonheur, "bonheur.pkl")

print("DONE PKL GENERATION")