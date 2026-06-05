

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchInfoData = createAsyncThunk(
  "info/fetchInfoData",

  async (_, thunkAPI) => {

    try {

      const res = await axios.post(
        "http://localhost:3000/info/predict",
        {
          values: [1000, 2500]
        }
      );

      return res.data.data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );

    }

  }
);



const infoSlice = createSlice({

  name: "info",

  initialState: {

    data: null,

    loading: false,

    error: null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      
      .addCase(fetchInfoData.pending, (state) => {

        state.loading = true;

        state.error = null;

      })

      
      .addCase(fetchInfoData.fulfilled, (state, action) => {

        state.loading = false;

        state.data = action.payload;

      })

     
      .addCase(fetchInfoData.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload;

      });

  }

});

export default infoSlice.reducer;