import { createAsyncThunk } from "@reduxjs/toolkit";
import appApi from "../../api/api";

export const addCharolas = createAsyncThunk(
  "sales/addCharolas",
  async (
    payload: { id_categoria: number; id_repartidor: number; cantidad: number },
    { rejectWithValue },
  ) => {
    try {
      await appApi.post("sales/charolas", payload);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Error al guardar charolas",
      );
    }
  },
);
