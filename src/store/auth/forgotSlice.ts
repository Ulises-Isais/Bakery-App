import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

interface ForgotState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ForgotState = {
  loading: false,
  success: false,
  error: null,
};

export const changePassword = createAsyncThunk(
  "forgot/changePassword",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await appApi.post("/auth/change-password", {
        username,
        newPassword: password,
      });

      if (!data.ok) throw new Error(data.msg);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Error al cambiar la contraseña",
      );
    }
  },
);

const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    resetPasswordState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPasswordState } = forgotSlice.actions;

export default forgotSlice.reducer;
