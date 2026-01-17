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
  totalesPorTurno: {
    mañana: number;
    tarde: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: SalesCardState = {
  turnos: {
    mañana: { total: 0, categorias: [] },
    tarde: { total: 0, categorias: [] },
  },
  totalGeneral: 0,
  totalesPorTurno: {
    mañana: 0,
    tarde: 0,
  },
  loading: false,
  error: null,
};

export const fetchSalesCards = createAsyncThunk(
  "salesCards/fetchSalesCards",
  async (
    { fecha, turno }: { fecha: string; turno?: string },
    { rejectWithValue }
  ) => {
    try {
      const body: any = { fecha };
      if (turno) body.turno = turno;

      const { data } = await appApi.post("/sales/cards", body);

      if (!data.ok) throw new Error(data.msg);

      return {
        turnos: data.turnos,
        totalGeneral: data.totalGeneral,
        totalesPorTurno: data.totalesPorTurno,
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
        state.totalesPorTurno = action.payload.totalesPorTurno;
        state.totalGeneral = action.payload.totalGeneral;
      })
      .addCase(fetchSalesCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default salesCardSlice.reducer;
