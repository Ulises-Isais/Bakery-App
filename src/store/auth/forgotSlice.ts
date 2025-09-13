import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

const forgotSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
    changePasswordStart(state) {
      state.loading = true;
      state.error = null;
    },
    changePasswordSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    changePasswordFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetPassword(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  changePasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  resetPassword,
} = forgotSlice.actions;

export default forgotSlice.reducer;
