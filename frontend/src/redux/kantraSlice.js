// kantraSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPrediction = createAsyncThunk(
  "kantra/fetchPrediction",
  async ({ a, b }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/kantra", { a, b });
      return { ...res.data, a, b }; // on garde input + output
    } catch (err) {
      return rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

const kantraSlice = createSlice({
  name: "kantra",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },

  reducers: {
    resetKantra: (state) => {
      state.history = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPrediction.fulfilled, (state, action) => {
        state.loading = false;

        state.history.unshift({
          a: action.payload.a,
          b: action.payload.b,
          prediction: action.payload.prediction,
          time: new Date().toLocaleTimeString(),
        });
      })

      .addCase(fetchPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetKantra } = kantraSlice.actions;
export default kantraSlice.reducer;