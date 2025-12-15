import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

interface TurnoCorte {
  total: number;
  categorias: {
    categoria: string;
    total: number;
  }[];
}

interface SalesCardState {
  turnos: Record<string, TurnoCorte>;
  totalGeneral: number;
  loading: boolean;
  error: string | null;
}

const initialState: SalesCardState = {
  turnos: {},
  totalGeneral: 0,
  loading: false,
  error: null,
};

export const fetchSalesCards = createAsyncThunk(
  "salesCards/fetchSalesCards",
  async (
    { fecha, turno }: { fecha: string; turno: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await appApi.post("/sales/cards", { fecha, turno });

      if (!data.ok) throw new Error(data.msg);

      return {
        turnos: data.turnos,
        totalGeneral: data.totalGeneral,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const salesCardSlice = createSlice({
  name: "salesCards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesCards.fulfilled, (state, action) => {
        state.loading = false;
        state.turnos = action.payload.turnos;
        state.totalGeneral = action.payload.totalGeneral;
      })
      .addCase(fetchSalesCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default salesCardSlice.reducer;
