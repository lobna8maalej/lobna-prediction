import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const predictData = createAsyncThunk(
  "predict/predictData",
  async (features, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/predict",
        {
          features,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const predictSlice = createSlice({
  name: "predict",
  initialState: {
    loading: false,
    result: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(predictData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(predictData.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })

      .addCase(predictData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default predictSlice.reducer;