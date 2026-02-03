import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import forgotSlice from "./auth/forgotSlice";
import salesSlice from "./sales/salesSlice";
import salesCardSlice from "./sales/salesSliceCards";
import despachoSlice from "./sales/salesDespachoSlice";
import salesRepartidoresTableSlice from "./sales/salesRepartidoresTableSlice";
import inventorySlice from "./inventory/inventorySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    forgot: forgotSlice,
    salesDriver: salesSlice,
    salesCards: salesCardSlice,
    salesDespacho: despachoSlice,
    salesRepartidoresTableSlice,
    inventory: inventorySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
