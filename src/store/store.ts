import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import forgotSlice from "./auth/forgotSlice";
import salesSlice from "./sales/salesSlice";
import salesCardSlice from "./sales/salesSliceCards";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    forgot: forgotSlice,
    sales: salesSlice,
    salesCards: salesCardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
