import type { SettlementCategoryForm } from "../../types/settlement";

export interface ValidationError {
  id_categoria: number;
  field: "cantidad_devuelta" | "cantidad_cambios";
  message: string;
}

interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export const validateSettlementBusinessRules = (
  categories: SettlementCategoryForm[],
): ValidationResult => {
  const errors: ValidationError[] = [];
  for (const category of categories) {
    const devoluciones =
      category.cantidad_devuelta === "" ? 0 : category.cantidad_devuelta;

    const cambios =
      category.cantidad_cambios === "" ? 0 : category.cantidad_cambios;

    const enviadas = category.cantidad;

    // Validar numeros negativos
    if (devoluciones < 0) {
      errors.push({
        id_categoria: category.id_categoria,
        field: "cantidad_devuelta",
        message: "Las devoluciones no pueden ser negativas.",
      });
      continue;
    }

    if (cambios < 0) {
      errors.push({
        id_categoria: category.id_categoria,
        field: "cantidad_cambios",
        message: `${category.categoria}: los cambios no pueden ser negativos.`,
      });
      continue;
    }
    // Validar devoluciones
    if (devoluciones > enviadas) {
      errors.push({
        id_categoria: category.id_categoria,
        field: "cantidad_devuelta",
        message: `Las devoluciones superan la cantidad enviada.`,
      });
      continue;
    }
    // Validar cambios
    if (cambios > enviadas) {
      errors.push({
        id_categoria: category.id_categoria,
        field: "cantidad_cambios",
        message: "Los cambios superan la cantidad enviada.",
      });
      continue;
    }
    // Validar suma
    if (devoluciones + cambios > enviadas) {
      errors.push({
        id_categoria: category.id_categoria,
        field: "cantidad_devuelta",
        message: "Regresos + cambios exceden la cantidad enviada.",
      });
      errors.push({
        id_categoria: category.id_categoria,
        field: "cantidad_cambios",
        message: "Regresos + cambios exceden la cantidad enviada.",
      });
    }
  }
  return {
    valid: errors.length === 0,
    errors,
  };
};
