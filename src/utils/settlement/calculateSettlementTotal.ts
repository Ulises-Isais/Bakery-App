import type { SettlementCategoryForm } from "../../types/settlement";

const CATEGORY_PRICES: Record<number, number> = {
  1: 8,
  2: 9,
  3: 9.5,
};
interface CalculateSettlementTotalParams {
  charolas: SettlementCategoryForm[];
  notas: number | "";
}

export const calculateSettlementTotal = ({
  charolas,
  notas,
}: CalculateSettlementTotalParams): number => {
  let total = 0;
  for (const charola of charolas) {
    const precio = CATEGORY_PRICES[charola.id_categoria] ?? 0;

    const enviados = charola.cantidad * precio;
    const devueltos =
      (charola.cantidad_devuelta === "" ? 0 : charola.cantidad_devuelta) *
      precio;
    const cambios =
      (charola.cantidad_cambios === "" ? 0 : charola.cantidad_cambios) * precio;
    const extras = (charola.extra === "" ? 0 : charola.extra) * precio;

    total += enviados - devueltos - cambios + extras;
  }

  total -= notas === "" ? 0 : notas;

  return total;
};
