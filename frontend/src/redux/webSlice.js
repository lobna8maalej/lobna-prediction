import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk pour créer une prédiction web
export const createWebPrediction = createAsyncThunk(
  "web/create",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:3000/web", payload);
      console.log("BACKEND RESPONSE:", res.data);
      return res.data; // { message, data: { prediction } }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const webSlice = createSlice({
  name: "web",
  initialState: {
    items: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWebPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWebPrediction.fulfilled, (state, action) => {
        state.loading = false;
        console.log("REDUX PAYLOAD:", action.payload);
        state.items = action.payload; // { message, data: { prediction } }
      })
      .addCase(createWebPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default webSlice.reducer;
