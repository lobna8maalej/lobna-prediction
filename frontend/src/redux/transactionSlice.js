import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk pour créer une transaction
export const createTransaction = createAsyncThunk(
  "transaction/create",
  async (payload, thunkAPI) => {
    try {
      // Appel backend avec payload { mode:"facture", value:18175 }
      const res = await axios.post("http://localhost:3000/transaction", payload);

      console.log("BACKEND RESPONSE:", res.data);

      // 🔥 Ton backend renvoie directement l'objet JSON
      // donc on retourne res.data
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    items: [],       // ✅ tableau vide par défaut
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload); // ajoute la transaction
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default transactionSlice.reducer;
