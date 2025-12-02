import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import appApi from "../../api/api";

//Tipos
interface Repartidor {
  nombre: string;
  notas: string;
  extra: number;
  regreso: number;
  cambios: number;
  total: number;
}

interface SalesState {
  repartidores: Repartidor[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  repartidores: [],
  loading: false,
  error: null,
};

export const fetchSales = createAsyncThunk(
  "sales/fetchSales",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await appApi.get("/sales/driver");
      if (!data.ok) throw new Error("Error en la respuesta del servidor");

      const mapped = data.ventas.map((v: any) => ({
        nombre: v.repartidor,
        notas: v.notas,
        extra: 0,
        regreso: 0,
        cambios: 0,
        total: Number(v.total) || 0,
      }));

      return mapped as Repartidor[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al obtener las ventas");
    }
  }
);

// Slice
const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    clearSales: (state) => {
      state.repartidores = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSales.fulfilled,
        (state, action: PayloadAction<Repartidor[]>) => {
          state.loading = false;
          state.repartidores = action.payload;
        }
      )
      .addCase(fetchSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSales } = salesSlice.actions;
export default salesSlice.reducer;
