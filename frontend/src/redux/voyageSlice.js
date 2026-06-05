import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk pour créer une prédiction voyage
export const createVoyagePrediction = createAsyncThunk(
  "voyage/create",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:3000/voyage", payload);

      console.log("BACKEND RESPONSE:", res.data);

      // 🔥 Ton backend renvoie { message, data: { prediction } }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const voyageSlice = createSlice({
  name: "voyage",
  initialState: {
    items: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVoyagePrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVoyagePrediction.fulfilled, (state, action) => {
        state.loading = false;
        console.log("REDUX PAYLOAD:", action.payload);
        state.items = action.payload; // { message, data: { prediction } }
      })
      .addCase(createVoyagePrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default voyageSlice.reducer;
