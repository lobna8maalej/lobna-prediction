import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import axios from "axios";

/* ================= API ================= */

export const fetchParapharma =
  createAsyncThunk(

    "parapharma/fetchParapharma",

    async (_, thunkAPI) => {

      try {

        const response = await axios.get(
          "http://localhost:3000/parapharma"
        );

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(

          error.response?.data?.error ||

          error.message
        );
      }
    }
  );

/* ================= SLICE ================= */

const parapharmaSlice = createSlice({

  name: "parapharma",

  initialState: {

    loading: false,

    error: null,

    message: "",

    rowsInserted: 0,

    items: []
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      /* ===== PENDING ===== */

      .addCase(

        fetchParapharma.pending,

        (state) => {

          state.loading = true;

          state.error = null;
        }
      )

      /* ===== SUCCESS ===== */

      .addCase(

        fetchParapharma.fulfilled,

        (state, action) => {

          state.loading = false;

          state.message =
            action.payload.message;

          state.rowsInserted =
            action.payload.rowsInserted;

          state.items =
            action.payload.data;
        }
      )

      /* ===== ERROR ===== */

      .addCase(

        fetchParapharma.rejected,

        (state, action) => {

          state.loading = false;

          state.error = action.payload;
        }
      );
  }
});

export default parapharmaSlice.reducer;