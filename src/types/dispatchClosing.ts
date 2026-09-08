export interface DispatchClosingPreviewResponse {
  ok: boolean;
  msg: string;
  fecha: string;
  turno: Turno;
  usuario: number;
  role: string;
  closing: DispatchClosing;
}

export interface DispatchClosing {
  existingClosing: ExistingClosing[];
  initialCount: AlCount[];
  incomeMovements: Movement[];
  adjustmentMovements: Movement[];
  pendingMovements: Movement[];
  finalCount: AlCount[];
  soldProducts: Sale[];
  sales: Sale[];
  totalVenta: number;
  orders: any[];
  orderPayments: any[];
  orderPaymentSummary: OrderPaymentSummary;
  ordersSummary: OrdersSummary;
  confirmedExpenses: ConfirmedExpense[];
  expenseSummary: ExpenseSummary;
  pendingExpenses: any[];
  dineroEsperado: number;
  cashDeliveries: any[];
  cashDeliverySummary: CashDeliverySummary;
  dineroEntregado: number;
  existeEntrega: boolean;
  diferencia: number | null;
}

export interface Movement {
  id_movimiento: number;
  fecha: string;
  turno: Turno;
  tipo_movimiento: string;
  id_categoria: number;
  categoria: Categoria;
  id_producto: number | null;
  producto: null | string;
  cantidad: number;
  estado: string;
  id_usuario: number;
  id_usuario_revision?: number;
  revisado_en?: string;
}

export type Categoria = "Bolillo" | "Pieza" | "Refri";

export type Turno = "mañana" | "tarde";

export interface CashDeliverySummary {
  dineroEntregado: number;
  existeEntrega: boolean;
}

export interface ConfirmedExpense {
  id_gasto: number;
  fecha: string;
  turno: Turno;
  concepto: string;
  monto: string;
  id_usuario: number;
  estado: string;
}

export interface ExistingClosing {
  id_cierre: number;
  fecha: string;
  turno: Turno;
  id_usuario_trabajadora: number;
  id_usuario_cierre: number;
  venta_calculada: string;
  dinero_esperado: string;
  dinero_entregado: string;
  diferencia: string;
  estado: string;
  creado_en: string;
  cerrado_en: string;
}

export interface ExpenseSummary {
  totalGastos: number;
}

export interface AlCount {
  id_detalle: number;
  id_conteo: number;
  fecha: string;
  turno: Turno;
  tipo_conteo: TipoConteo;
  id_usuario: number;
  id_categoria: number;
  categoria: Categoria;
  id_producto: number | null;
  producto: null | string;
  cantidad: number;
}

export type TipoConteo =
  | "admin_inicial"
  | "trabajador_final"
  | "trabajador_inicial";

export interface OrderPaymentSummary {
  dineroRecibidoPedidos: number;
}

export interface OrdersSummary {
  totalPedidos: number;
  totalPagadoPedidos: number;
  totalPendientePedidos: number;
}

export interface Sale {
  id_categoria: number;
  categoria: Categoria;
  id_producto: number | null;
  producto: null | string;
  cantidad_inicial: number;
  cantidad_ingresada: number;
  cantidad_movida: number;
  cantidad_final: number;
  cantidad_vendida: number;
  precio_unitario?: number;
  importe?: number;
}
