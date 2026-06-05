import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour lancer la prédiction Banque
export const createBanquePrediction = createAsyncThunk(
  "banque/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/banque", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

const banqueSlice = createSlice({
  name: "banque",
  initialState: {
    predictionData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBanquePrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBanquePrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.predictionData = action.payload;
      })
      .addCase(createBanquePrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default banqueSlice.reducer;
