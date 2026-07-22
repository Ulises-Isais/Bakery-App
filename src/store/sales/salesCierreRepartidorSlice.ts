import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

interface CharolaRepartidor {
  id_charola: string;
  id_categoria: number;
  categoria: string;
  cantidad: number;
}

interface CierreRepartidorState {
  charolas: CharolaRepartidor[];
  loading: boolean;
  error: string | null;
}

const initialState: CierreRepartidorState = {
  charolas: [],
  loading: false,
  error: null,
};

//===========================
// THUNK

export const fetchCierreRepartidor = createAsyncThunk(
  "salesCierreRepartidor/fetchCierreRepartidor",
  async (
    {
      id_repartidor,
      fecha,
    }: {
      id_repartidor: number;
      fecha: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await appApi.post("/sales/charolas/repartidor", {
        id_repartidor,
        fecha,
      });

      if (!data.ok) {
        throw new Error(data.msg || "Error en la respuesta del servidor");
      }

      return data.charolas;
    } catch (error: any) {
      return rejectWithValue(error.message || "Error al obtener las charolas");
    }
  },
);

// ===================
// SLICE
const salesCierresRepartidorSlice = createSlice({
  name: "salesCierreRepartidor",
  initialState,
  reducers: {
    clearCierreRepartidor: (state) => {
      state.charolas = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCierreRepartidor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCierreRepartidor.fulfilled, (state, action) => {
        state.loading = false;
        state.charolas = action.payload;
      })

      .addCase(fetchCierreRepartidor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCierreRepartidor } = salesCierresRepartidorSlice.actions;

export default salesCierresRepartidorSlice.reducer;
