import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

interface SalesState {
  despacho: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  despacho: [],
  loading: false,
  error: null,
};

export const fetchDespacho = createAsyncThunk(
  "salesDespacho/fetchDespacho",
  async (
    { fecha, turno }: { fecha: string; turno: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await appApi.post("/sales/despacho", { fecha, turno });

      if (!data.ok)
        throw new Error(data.msg || "Error en la respuesta del servidor");

      return data.despacho;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const despachoSlice = createSlice({
  name: "despachos",
  initialState,
  reducers: {
    clearDespacho: (state) => {
      state.despacho = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDespacho.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDespacho.fulfilled, (state, action) => {
        state.loading = false;
        state.despacho = action.payload;
      })
      .addCase(fetchDespacho.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDespacho } = despachoSlice.actions;

export default despachoSlice.reducer;
