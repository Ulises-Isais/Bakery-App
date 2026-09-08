import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  DispatchClosingPreviewResponse,
  DispatchClosing,
  Turno,
} from "../../types/dispatchClosing";
import appApi from "../../api/api";

interface DispatchClosingState {
  closing: DispatchClosing | null;
  loading: boolean;
  error: string | null;
}

const initialState: DispatchClosingState = {
  closing: null,
  loading: false,
  error: null,
};

export const fetchDispatchClosingPreview = createAsyncThunk<
  DispatchClosingPreviewResponse,
  {
    fecha: string;
    turno: Turno;
  }
>(
  "dispatchClosing/fetchPreview",
  async ({ fecha, turno }, { rejectWithValue }) => {
    try {
      const { data } = await appApi.post("/dispatch-closing/preview", {
        fecha,
        turno,
      });

      if (!data.ok) {
        throw new Error(data.msg || "Error al obtener el preview del cierre");
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg ||
          error.message ||
          "Error al obtener el preview del cierre",
      );
    }
  },
);

const dispatchClosingSlice = createSlice({
  name: "dispatchClosing",
  initialState,
  reducers: {
    clearDispatchClosing: (state) => {
      state.closing = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDispatchClosingPreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDispatchClosingPreview.fulfilled, (state, action) => {
        state.loading = false;
        state.closing = action.payload.closing;
      })
      .addCase(fetchDispatchClosingPreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDispatchClosing } = dispatchClosingSlice.actions;

export default dispatchClosingSlice.reducer;
