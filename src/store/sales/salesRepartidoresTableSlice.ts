// Tipos

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

export interface RepartidorTableRow {
  nombre: string;
  categoria: string;
  cantidad: number;
  extra: number;
  regreso: number;
  totalRegreso: number;
  cambios: number;
  totalCambios: number;
  total: number;
  debe: number;
}

interface SalesRepartidoresTableState {
  rows: RepartidorTableRow[];
  loading: boolean;
  error: string | null;
}

// Estado inicial

const initialState: SalesRepartidoresTableState = {
  rows: [],
  loading: false,
  error: null,
};

// Thunk
export const fetchSalesRepartidoresTable = createAsyncThunk(
  "salesRepartidoresTable/fetch",
  async ({ fecha }: { fecha: string }, { rejectWithValue }) => {
    try {
      const { data } = await appApi.post("/sales/repartidores/table", {
        fecha,
      });

      if (!data.ok) throw new Error(data.msg);

      return data.data as RepartidorTableRow[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
// Slice
const salesRepartidoresTableSlice = createSlice({
  name: "salesRepartidoresTable",
  initialState,
  reducers: {
    clearRepartidoresTable: (state) => {
      state.rows = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesRepartidoresTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesRepartidoresTable.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchSalesRepartidoresTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRepartidoresTable } = salesRepartidoresTableSlice.actions;

export default salesRepartidoresTableSlice.reducer;
