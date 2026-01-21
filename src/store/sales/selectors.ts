import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../store";

/**
 * Total de ventas de repartidores obtenido del slice `salesDriver`.
 *
 * Este selector usa datos del endpoint /sales/driver,
 * no del corte consolidado por cateorías
 */
export const selectTotalRepartidores = createSelector(
  (state: RootState) => state.salesDriver.repartidores,
  (repartidores) => repartidores.reduce((acc, r) => acc + r.total, 0),
);

/**
 * Total general que combina:
 * - Total del corte de caja (despacho)
 * - Total de ventas de repartidores
 */
export const selectTotalGeneralConRepartidores = createSelector(
  [
    (state: RootState) => state.salesCards.totalGeneral,
    selectTotalRepartidores,
  ],
  (totalCorteCaja, totalRepartidores) => totalCorteCaja + totalRepartidores,
);

/**
 * Selector para la tabla de repartidores.
 * Devuelve unicamente la información necesaria para la UI:
 * - rows
 * - loading
 * - error
 */
export const selectRepartidoresTable = createSelector(
  (state: RootState) => state.salesRepartidoresTableSlice,
  (table) => ({
    rows: table.rows,
    loading: table.loading,
    error: table.error,
  }),
);
/**
 * Calcula el total de ventas de repartidores a partir de la tabla normalizada.
 *
 * La tabla contiene una fila por (repartidor, categoria),
 * por lo que NO se debe de sumar directamente.
 *
 * Este selector agrupa y toma el total una sola vez
 * para evitar duplicaciones en la Card.
 */
export const selectTotalRepartidoresFromTable = createSelector(
  (state: RootState) => state.salesRepartidoresTableSlice.rows,
  (rows) => {
    const totalsByRepartidor = new Map<string, number>();

    rows.forEach((row) => {
      if (!totalsByRepartidor.has(row.nombre)) {
        totalsByRepartidor.set(row.nombre, row.total || 0);
      }
    });

    return Array.from(totalsByRepartidor.values()).reduce(
      (acc, total) => acc + total,
      0,
    );
  },
);
