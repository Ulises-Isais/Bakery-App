import type { RootState } from "../store";

export const selectDispatchClosing = (state: RootState) =>
  state.dispatchClosing.closing;

export const selectDispatchClosingLoading = (state: RootState) =>
  state.dispatchClosing.loading;

export const selectDispatchClosingError = (state: RootState) =>
  state.dispatchClosing.error;
