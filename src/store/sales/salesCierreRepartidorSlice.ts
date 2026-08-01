import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";
import type {
  DriverSettlementPayload,
  SettlementCategoryApi,
  FetchCierreRepartidorRequest,
} from "../../types/settlement";

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

//===========================
// THUNK

export const fetchCierreRepartidor = createAsyncThunk<
  SettlementCategoryApi[],
  FetchCierreRepartidorRequest
>(
  "salesCierreRepartidor/fetchCierreRepartidor",
  async (
    { id_repartidor, fecha }: FetchCierreRepartidorRequest,
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

export const saveDriverSettlement = createAsyncThunk<
  { ok: boolean; msg: string },
  DriverSettlementPayload
>(
  "salesCierreRepartidor/saveDriverSettlement",
  async (payload: DriverSettlementPayload, { rejectWithValue }) => {
    try {
      const { data } = await appApi.post("/sales/driver-settlement", payload);

      if (!data.ok) {
        throw new Error(data.msg || "Error al guardar el cierre");
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Error al guardar el cierre",
      );
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
      })

      // ==========================
      // GUARDAR CIERRE
      // ==========================
      .addCase(saveDriverSettlement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(saveDriverSettlement.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(saveDriverSettlement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCierreRepartidor } = salesCierreRepartidorSlice.actions;

export default salesCierreRepartidorSlice.reducer;
