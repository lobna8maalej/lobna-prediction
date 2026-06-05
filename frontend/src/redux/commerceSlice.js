import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FETCH DATA FROM BACKEND
export const fetchCommerce = createAsyncThunk(
  "commerce/fetchCommerce",
  async () => {
    const response = await axios.get("http://localhost:3000/commerce/train");
    return response.data.data;
  }
);

const commerceSlice = createSlice({
  name: "commerce",
  initialState: {
    data: [],
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommerce.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommerce.fulfilled, (state, action) => {
        state.loading = false;

        // 🔁 REPETITION LOGIC (important)
        state.data = action.payload.map((item) => ({
          ...item,
          label: `${item.commerce} - ${item.web_scraper}`
        }));
      })
      .addCase(fetchCommerce.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default commerceSlice.reducer;