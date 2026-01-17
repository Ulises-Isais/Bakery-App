import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../store";

export const selectTotalRepartidores = createSelector(
  (state: RootState) => state.salesDriver.repartidores,
  (repartidores) => repartidores.reduce((acc, r) => acc + r.total, 0)
);
export const selectTotalGeneralConRepartidores = createSelector(
  [
    (state: RootState) => state.salesCards.totalGeneral,
    selectTotalRepartidores,
  ],
  (totalCorteCaja, totalRepartidores) => totalCorteCaja + totalRepartidores
);
