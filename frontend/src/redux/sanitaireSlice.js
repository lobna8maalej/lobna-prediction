// src/redux/sanitaireSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchSanitaireData = createAsyncThunk(
  "sanitaire/fetchSanitaireData",

  async (_, thunkAPI) => {

    try {

      const response = await axios.get(
        "http://localhost:3000/sanitaire"
      );

      return response.data.data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.error || err.message
      );
    }
  }
);



const sanitaireSlice = createSlice({

  name: "sanitaire",

  initialState: {

    data: null,

    loading: false,

    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      

      .addCase(fetchSanitaireData.pending, (state) => {

        state.loading = true;

        state.error = null;

      })

      

      .addCase(fetchSanitaireData.fulfilled, (state, action) => {

        state.loading = false;

        state.data = action.payload;

      })

      

      .addCase(fetchSanitaireData.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      });

  }

});

export default sanitaireSlice.reducer;