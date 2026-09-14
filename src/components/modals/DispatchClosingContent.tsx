import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { DispatchClosing } from "../../types/dispatchClosing";
import { formatMoney } from "../../helpers/formatMoney";

const dispatchTableSx = {
  "& .MuiTableCell-root": {
    py: 1,
  },
  "& .MuiTableHead-root .MuiTableCell-root": {
    backgroundColor: "grey.100",
    fontWeight: 600,
  },
};
interface Props {
  closing: DispatchClosing;
}
export const DispatchClosingContent = ({ closing }: Props) => {
  return (
    <Box>
      {/* =============================INVENTARIO============================= */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Inventario</Typography>
        {/* Conteo inicial */}
        <Typography variant="subtitle1">Conteo inicial</Typography>
        <Table sx={dispatchTableSx}>
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
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Ingresos</Typography>
        <Table sx={dispatchTableSx}>
          {/* Tabla de Ingresos */}
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.incomeMovements.length > 0 ? (
              closing.incomeMovements.map((item) => (
                <TableRow key={item.id_movimiento}>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Sin registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Tabla de movimientos  */}
        <Typography variant="subtitle1">Movimientos de ajuste</Typography>
        <Table sx={dispatchTableSx}>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.adjustmentMovements.length > 0 ? (
              closing.adjustmentMovements.map((item) => (
                <TableRow key={item.id_movimiento}>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Sin registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Tabla de movimientos pendientes */}
        <Typography variant="subtitle1">Movimientos pendientes</Typography>
        <Table sx={dispatchTableSx}>
          <TableHead>
            <TableRow>
              <TableCell>Categoría</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.pendingMovements.length > 0 ? (
              closing.pendingMovements.map((item) => (
                <TableRow key={item.id_movimiento}>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Sin registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Tabla de conteo final */}
        <Typography variant="subtitle1">Conteo Final</Typography>
        <Table sx={dispatchTableSx}>
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
      </Paper>

      {/* =========================VENTAS========================= */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6"> Ventas</Typography>
        <Typography variant="subtitle1">Productos Vendidos</Typography>
        <Table sx={dispatchTableSx}>
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
        <TableContainer>
          <Table sx={dispatchTableSx}>
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
        </TableContainer>
        {/* Total Venta */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Total Venta</Typography>
          <Typography variant="h6">
            {formatMoney(closing.totalVenta)}
          </Typography>
        </Box>
      </Paper>
      {/* =========================PEDIDOS========================= */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Pedidos</Typography>
        {/* Resumen de pedidos  */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box>
            <Typography variant="body2">Total Pedidos</Typography>
            <Typography variant="h6">
              {closing.ordersSummary.totalPedidos}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Total Pagado</Typography>
            <Typography variant="h6">
              {formatMoney(closing.ordersSummary.totalPagadoPedidos)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Total pendiente</Typography>
            <Typography variant="h6">
              {formatMoney(closing.ordersSummary.totalPendientePedidos)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Dinero recibido de pedidos</Typography>
          <Typography variant="h6">
            {formatMoney(closing.orderPaymentSummary.dineroRecibidoPedidos)}
          </Typography>
        </Box>
      </Paper>

      {/* =========================GASTOS========================= */}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Gastos</Typography>

        {/* Gastos confirmados */}
        <Typography variant="subtitle1">Gastos confirmados</Typography>
        <Table sx={dispatchTableSx}>
          <TableHead>
            <TableRow>
              <TableCell>Concepto</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {closing.confirmedExpenses.length > 0 ? (
              closing.confirmedExpenses.map((item) => (
                <TableRow key={item.id_gasto}>
                  <TableCell>{item.concepto}</TableCell>
                  <TableCell>{formatMoney(item.monto)}</TableCell>
                  <TableCell>{item.estado}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Sin registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box sx={{ mt: 2 }}>
          {/* Resumen de gastos */}
          <Typography variant="body2">Total Gastos</Typography>
          <Typography variant="h6">
            {formatMoney(closing.expenseSummary.totalGastos)}
          </Typography>
        </Box>
      </Paper>

      {/* =========================EFECTIVO========================= */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Efectivo</Typography>
        {/* Dinero esperado */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Box>
            <Typography variant="body2">Dinero esperado</Typography>
            <Typography variant="h6">
              {formatMoney(closing.dineroEsperado)}
            </Typography>
          </Box>
          <Box>
            {/* dinero entregado */}
            <Typography variant="body2">Dinero entregado</Typography>
            <Typography variant="h6">
              {formatMoney(closing.cashDeliverySummary.dineroEntregado)}
            </Typography>
          </Box>
          <Box>
            {/* Diferencia */}
            <Typography variant="body2">Diferencia</Typography>
            <Typography
              variant="h6"
              color={closing.diferencia === null ? "#D97706" : undefined}
            >
              {closing.diferencia === null
                ? "Pendiente"
                : formatMoney(closing.diferencia)}
            </Typography>
          </Box>
        </Box>

        {/* Estado */}
        <Typography
          sx={{ mt: 2 }}
          color={
            closing.cashDeliverySummary.existeEntrega ? "#15803D" : "error.main"
          }
        >
          Entrega registrada:{" "}
          {closing.cashDeliverySummary.existeEntrega ? "Sí" : "No"}
        </Typography>
      </Paper>
      {/* =================ESTADO================= */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Estado del cierre</Typography>
        <Box>
          <Typography variant="subtitle1">Movimientos pendientes</Typography>
          <Typography
            color={
              closing.pendingMovements.length > 0 ? "error.main" : "#15803d"
            }
          >
            {closing.pendingMovements.length > 0
              ? "Existen movimientos pendientes"
              : "No hay movimientos pendientes"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">Cierre previo</Typography>
          <Typography
            color={
              closing.existingClosing.length > 0 ? "error.main" : "#15803d"
            }
          >
            {closing.existingClosing.length > 0
              ? "Ya existe un cierre para este turno"
              : "No existe un cierre previo"}
          </Typography>
        </Box>
      </Paper>

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
