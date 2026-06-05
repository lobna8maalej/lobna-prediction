import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour lancer la prédiction CA
export const createPrediction = createAsyncThunk(
  "ca/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/CA", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

const caSlice = createSlice({
  name: "ca",
  initialState: {
    predictionData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.predictionData = action.payload;
      })
      .addCase(createPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default caSlice.reducer;
