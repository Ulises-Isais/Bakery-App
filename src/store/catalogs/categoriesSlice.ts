import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../../api/api";

export interface Categoria {
  id_categoria: number;
  nombre: string;
}

export const fetchCategorias = createAsyncThunk(
  "categorias/fetch",
  async () => {
    const { data } = await appApi.get("/categorias");
    return data.categorias as Categoria[];
  },
);

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: {
    items: [] as Categoria[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorias.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategorias.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export default categoriasSlice.reducer;
