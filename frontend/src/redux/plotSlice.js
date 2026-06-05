import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= FETCH ================= */

export const fetchPlotData = createAsyncThunk(
  "plot/fetchPlotData",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3000/plot/plot");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* ================= SLICE ================= */

const plotSlice = createSlice({
  name: "plot",

  initialState: {
    loading: false,
    error: null,
    message: "",
    rows: []
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPlotData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlotData.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.rows = action.payload.data.rows;
      })
      .addCase(fetchPlotData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default plotSlice.reducer;