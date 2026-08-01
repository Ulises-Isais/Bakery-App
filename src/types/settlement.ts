// Respuesta del endpoint
// /sales/charolas/repartidor

export interface SettlementCategoryApi {
  id_charola: number;
  id_categoria: number;
  categoria: string;
  cantidad: number;
}

// Charola utilizada dentro del formulario
// ===============
// FORMULARIO
// ===============

export interface SettlementCategoryForm extends SettlementCategoryApi {
  cantidad_devuelta: number | "";
  cantidad_cambios: number | "";
  extra: number | "";
}

export interface SettlementFormValues {
  repartidor: number;
  fecha: string;
  charolas: SettlementCategoryForm[];
  total: number | "";
  dineroPendiente: number | "";
  notas: number | "";
}
// ===============
// API
// ===============

export interface FetchCierreRepartidorRequest {
  id_repartidor: number;
  fecha: string;
}

export interface DriverSettlementCategoryPayload {
  id_categoria: number;
  cantidad_devuelta: number;
  cantidad_cambios: number;
  extra: number;
}

export interface DriverSettlementPayload {
  id_repartidor: number;
  fecha: string;
  total: number;
  dinero_pendiente: number;
  notas: number;
  categorias: DriverSettlementCategoryPayload[];
}
