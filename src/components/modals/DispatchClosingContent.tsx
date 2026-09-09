import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { DispatchClosing } from "../../types/dispatchClosing";
interface Props {
  closing: DispatchClosing;
}
export const DispatchClosingContent = ({ closing }: Props) => {
  return (
    <Box>
      <Typography variant="h5">Cierre de Despacho</Typography>
      {/* =============================INVENTARIO============================= */}
      <Box>
        <Typography variant="h6">Inventario</Typography>
        {/* Conteo inicial */}
        <Typography variant="subtitle1">Conteo inicial</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.initialCount.map((item) => (
              <TableRow key={item.id_detalle}>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="subtitle1">Ingresos</Typography>
        <Table>
          {/* Tabla de Ingresos */}
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.incomeMovements.map((item) => (
              <TableRow key={item.id_movimiento}>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Tabla de movimientos  */}
        <Typography variant="subtitle1">Movimientos de ajuste</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.adjustmentMovements.map((item) => (
              <TableRow key={item.id_movimiento}>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Tabla de movimientos pendientes */}
        <Typography variant="subtitle1">Movimientos pendientes</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.pendingMovements.map((item) => (
              <TableRow key={item.id_movimiento}>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Tabla de conteo final */}
        <Typography variant="subtitle1">Conteo Final</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.finalCount.map((item) => (
              <TableRow key={item.id_detalle}>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* =========================VENTAS========================= */}
      <Box>
        <Typography variant="h6"> Ventas</Typography>
        <Typography variant="subtitle1">Productos Vendidos</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.soldProducts.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.cantidad_vendida}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Tabla de ventas */}
        <Typography variant="subtitle1">Detalle de ventas</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad vendida</TableCell>
              <TableCell>Precio unitario</TableCell>
              <TableCell>Importe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.sales.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.producto}</TableCell>
                <TableCell>{item.cantidad_vendida}</TableCell>
                <TableCell>{item.precio_unitario}</TableCell>
                <TableCell>{item.importe}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Total Venta */}
        <Typography variant="h6">Total Venta: {closing.totalVenta}</Typography>
      </Box>
      {/* =========================PEDIDOS========================= */}
      <Box>
        <Typography variant="h6">Pedidos</Typography>
        {/* Resumen de pedidos  */}
        <Typography>
          Total Pedidos: {closing.ordersSummary.totalPedidos}
        </Typography>
        <Typography>
          Total Pagado: {closing.ordersSummary.totalPagadoPedidos}
        </Typography>
        <Typography>
          Total pendiente: {closing.ordersSummary.totalPendientePedidos}
        </Typography>

        <Typography variant="subtitle1">Dinero recibido de pedidos</Typography>
        <Typography>
          {closing.orderPaymentSummary.dineroRecibidoPedidos}
        </Typography>
      </Box>

      {/* =========================GASTOS========================= */}

      <Box>
        <Typography variant="h6">Gastos</Typography>

        {/* Gastos confirmados */}
        <Typography variant="subtitle1">Gastos confirmados</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Concepto</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.confirmedExpenses.map((item) => (
              <TableRow key={item.id_gasto}>
                <TableCell>{item.concepto}</TableCell>
                <TableCell>{item.monto}</TableCell>
                <TableCell>{item.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography>
          Total Gastos: {closing.expenseSummary.totalGastos}
        </Typography>
        {/* Resumen de gastos */}
      </Box>

      {/* =========================EFECTIVO========================= */}
      <Box>
        <Typography variant="h6">Efectivo</Typography>
        {/* Dinero esperado */}
        <Typography>Dinero esperado: {closing.dineroEsperado}</Typography>

        {/* dinero entregado */}
        <Typography>
          Dinero entregado: {closing.cashDeliverySummary.dineroEntregado}
        </Typography>

        {/* Diferencia */}

        <Typography>
          Diferencia:{" "}
          {closing.diferencia === null ? "Pendiente" : closing.diferencia}
        </Typography>

        {/* Estado */}

        <Typography>
          Entrega registrada:
          {closing.cashDeliverySummary.existeEntrega ? "Sí" : "No"}
        </Typography>
      </Box>
      {/* =================ESTADO================= */}
      <Box>
        <Typography variant="h6">Estado del cierre</Typography>
        <Typography>
          {closing.pendingMovements.length > 0
            ? "Existen movimientos pendientes"
            : "No hay movimientos pendientes"}
        </Typography>
        <Typography>
          {closing.existingClosing.length > 0
            ? "Ya existe un cierre para este turno"
            : "No existe un cierre previo"}
        </Typography>
      </Box>

      {/* <Button
        variant="contained"
        disabled={
          closing.pendingMovements.length > 0 ||
          closing.existingClosing.length > 0
        }
      >
        Cerrar despacho
      </Button> */}
    </Box>
  );
};
