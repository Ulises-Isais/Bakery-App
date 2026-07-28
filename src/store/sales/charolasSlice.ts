import { createAsyncThunk } from "@reduxjs/toolkit";
import appApi from "../../api/api";

type AddCharolasPayload = {
  id_repartidor: number;
  productos: {
    id_categoria: number;
    cantidad: number;
  }[];
};

export const addCharolas = createAsyncThunk(
  "sales/addCharolas",
  async (payload: AddCharolasPayload, { rejectWithValue }) => {
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
