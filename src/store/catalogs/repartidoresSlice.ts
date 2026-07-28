import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

interface Repartidor {
  id_repartidor: number;
  nombre: string;
}

interface RepartidoresState {
  items: Repartidor[];
  loading: boolean;
  error: string | null;
}

const initialState: RepartidoresState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchRepartidores = createAsyncThunk(
  "repartidores/fetchRepartidores",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await appApi.get("/repartidores");
      return data.repartidores as Repartidor[];
    } catch (error: any) {
      return rejectWithValue("Error al obtener repartidores");
    }
  },
);

const repartidoresSlice = createSlice({
  name: "repartidores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepartidores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepartidores.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRepartidores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default repartidoresSlice.reducer;
