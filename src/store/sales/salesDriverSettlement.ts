import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

interface CategoriaSettlement {
  id_categoria: number;
  cantidad_devuelta: number;
  cantidad_cambios: number;
  extra: number;
}

interface DriverSettlementPayload {
  id_repartidor: number;
  fecha: string;
  total: number;
  dinero_pendiente: number;
  notas: number;
  categorias: CategoriaSettlement[];
}

interface DriverSettlementState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: DriverSettlementState = {
  loading: false,
  success: false,
  error: null,
};

export const driverSettlement = createAsyncThunk(
  "sales/driverSettlement",
  async (payload: DriverSettlementPayload, { rejectWithValue }) => {
    try {
      const { data } = await appApi.post("/sales/driver-settlement", payload);

      if (!data.ok) {
        throw new Error(data.msg || "Error en la respuesta del servidor.");
      }

      return data.msg;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Error al realizar el cierre.",
      );
    }
  },
);

const salesDriverSettlementSlice = createSlice({
  name: "salesDriverSettlement",
  initialState,
  reducers: {
    clearDriverSettlement: (state) => {
      state.loading = false;
      ((state.success = false), (state.error = null));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(driverSettlement.pending, (state) => {
        ((state.loading = true), (state.success = false), (state.error = null));
      })
      .addCase(driverSettlement.fulfilled, (state) => {
        ((state.loading = false), (state.success = true));
      })
      .addCase(driverSettlement.rejected, (state, action) => {
        ((state.loading = false),
          (state.success = false),
          (state.error = action.payload as string));
      });
  },
});

export const { clearDriverSettlement } = salesDriverSettlementSlice.actions;

export default salesDriverSettlementSlice.reducer;
