import { configureStore } from "@reduxjs/toolkit";

import caReducer from "./caSlice";
import banqueReducer from "./banqueSlice";
import voyageReducer from "./voyageSlice";
import webReducer from "./webSlice";
import vetementReducer from "./vetementSlice";
import immobilierReducer from "./immobilierSlice";
import kantraReducer from "./kantraSlice";
import transactionReducer from "./transactionSlice";
import radioReducer from "./radioSlice";
import parapharmaReducer from "./parapharmaSlice";
import serverReducer from "./serverSlice";
import plotReducer from "./plotSlice";
import etudeReducer from "./etudeSlice";
import sanitaireReducer from "./sanitaireSlice";
import infoReducer from "./infoSlice";
import commerceReducer from "./commerceSlice";
import predictReducer from "./predictSlice";

import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    ca: caReducer,
    banque: banqueReducer,
    voyage: voyageReducer,
    web: webReducer,
    vetement: vetementReducer,
    immobilier: immobilierReducer,
    kantra: kantraReducer,
    transaction: transactionReducer,
    radio: radioReducer,
    parapharma: parapharmaReducer,
    server: serverReducer,
    plot: plotReducer,
    etude: etudeReducer,
    sanitaire: sanitaireReducer,
    info: infoReducer,
    commerce: commerceReducer,
    predict: predictReducer,

    users: userReducer,
  },
});