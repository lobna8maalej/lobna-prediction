import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRadio = createAsyncThunk(
  "radio/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/radio");
      return res.data; // { message, count, columns, images }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const radioSlice = createSlice({
  name: "radio",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRadio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRadio.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRadio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default radioSlice.reducer;
