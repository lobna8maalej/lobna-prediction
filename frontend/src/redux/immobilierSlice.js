import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 👉 Thunk pour insérer des données
export const insertImmobilier = createAsyncThunk(
  "immobilier/insertImmobilier",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/insert", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const immobilierSlice = createSlice({
  name: "immobilier",
  initialState: {
    status: null,
    message: "",
    rows: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertImmobilier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertImmobilier.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.rows = action.payload.rows;
      })
      .addCase(insertImmobilier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default immobilierSlice.reducer;
