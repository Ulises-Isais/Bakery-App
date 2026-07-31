import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";
import type { SettlementCategoryApi } from "../../types/settlement";

interface CierreRepartidorState {
  charolas: SettlementCategoryApi[];
  loading: boolean;
  error: string | null;
}

const initialState: CierreRepartidorState = {
  charolas: [],
  loading: false,
  error: null,
};

interface FetchCierreRepartidorRequest {
  id_repartidor: number;
  fecha: string;
}

//===========================
// THUNK

export const fetchCierreRepartidor = createAsyncThunk<
  SettlementCategoryApi[],
  FetchCierreRepartidorRequest
>(
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
const salesCierreRepartidorSlice = createSlice({
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

export const { clearCierreRepartidor } = salesCierreRepartidorSlice.actions;

export default salesCierreRepartidorSlice.reducer;
