import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ================= API CALL =================
export const fetchServerPrediction = createAsyncThunk(
  "server/fetchPrediction",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/server/predict",
        data
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Server error"
      );
    }
  }
);

// ================= SLICE =================
const serverSlice = createSlice({
  name: "server",

  initialState: {
    result: null,
    loading: false,
    error: null,
    history: []
  },

  reducers: {
    resetServer: (state) => {
      state.result = null;
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchServerPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchServerPrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;

        // history push
        state.history.unshift(action.payload);
      })

      .addCase(fetchServerPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetServer } = serverSlice.actions;
export default serverSlice.reducer;