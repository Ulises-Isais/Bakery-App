import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

interface Corte {
  id_categoria: number;
  total_por_categoria: number;
  total_general: number;
}

interface CardState {
  corte: Corte[];
  totalGeneral: number;
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  corte: [],
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
        corte: data.corte,
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
        state.corte = action.payload.corte;
        state.totalGeneral = action.payload.totalGeneral;
      })
      .addCase(fetchSalesCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default salesCardSlice.reducer;
