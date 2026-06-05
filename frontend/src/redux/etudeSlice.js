import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= FETCH DATA ================= */

export const fetchEtudeData = createAsyncThunk(
  "etude/fetchEtudeData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/etude/dashboard");
      return response.data.data; // 👈 important
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/* ================= SLICE ================= */

const etudeSlice = createSlice({
  name: "etude",
  initialState: {
    items: [],
    loading: false,
    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      // ===== LOADING =====
      .addCase(fetchEtudeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ===== SUCCESS =====
      .addCase(fetchEtudeData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      // ===== ERROR =====
      .addCase(fetchEtudeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default etudeSlice.reducer;