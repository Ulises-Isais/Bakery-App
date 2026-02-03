import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

export interface InventoryItem {
  id: number;
  producto: string;
  entraron: number;
  quedan: number;
  unidad: string;
  proveedor: string;
  minimo: number;
  fechaUltimoIngreso: string;
  observaciones: string;
  bajoStock: number;
}

interface InventoryState {
  items: InventoryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await appApi.get("/inventory");
      return data.inventario;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    clearInventory(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
