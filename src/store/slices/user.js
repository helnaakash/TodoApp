import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-simple-toasts";
import data from "../../utils/data";

export const initialState = {
  user: {},
  error: "",
  loading: false,
};

export const login = createAsyncThunk(
  "user/login",
  async (params, { rejectWithValue }) => {
    // console.log("async params"+JSON.stringify(params));
    // console.log(data.users)
    try {
      const res = await data.users.find(
        (it) => (it.name == params.username) & (it.password == params.password)
      );
      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
      } else {
        localStorage.setItem("user", "");
      }
      return res;
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload || {};
      state.error = "";
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action?.payload || "";
      state.loading = false;
    });
    // builder.addCase(logout.fulfilled, (state) => {
    //   state.user = {};
    // });
    // builder.addCase(logout.rejected, (state) => {
    //   state.error = "something went wrong";
    // });
  },
});

export default userSlice.reducer;
