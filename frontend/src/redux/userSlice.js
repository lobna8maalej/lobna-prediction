import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const RegisterUser = createAsyncThunk(
  "users/register",

  async (userdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        userdata,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const LoginUser = createAsyncThunk(
  "users/login",

  async (userdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        userdata,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;