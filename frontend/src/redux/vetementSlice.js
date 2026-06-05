import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVetementData = createAsyncThunk(
  "vetement/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3000/vetement");
      return res.data; // { message, size, data: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const vetementSlice = createSlice({
  name: "vetement",
  initialState: {
    items: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVetementData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVetementData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchVetementData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vetementSlice.reducer;
