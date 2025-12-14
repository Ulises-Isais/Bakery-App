import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { formatMoney } from "../helpers";

import { Sidebar } from "../components/Sidebar";
import { Cards } from "../components/Cards";
import { DataTable } from "../components";
import { fetchSales } from "../store/sales/salesSlice";
import { fetchSalesCards } from "../store/sales/salesSliceCards";

export const DashboardPage = () => {
  const dispatch = useAppDispatch();

  // Estado del slice
  const {
    repartidores,
    loading: loadingSales,
    error: errorSales,
  } = useAppSelector((state) => state.salesDriver);

  const { corte, totalGeneral } = useAppSelector((state) => state.salesCards);

  // Llamada al backend al montar el componente

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchSalesCards({ fecha: "2025-09-12", turno: "tarde" }));
    // dispatch(fetchSalesCards({ fecha: "2025-09-12", turno: "tarde" }));
  }, [dispatch]);

  if (loadingSales) {
    return <Typography>Cargando...</Typography>;
  }
  if (errorSales) {
    return <Typography color="error">Error: {errorSales}</Typography>;
  }

  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>
        Inicio
      </Typography>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Total venta repartidores"
            value={formatMoney(
              repartidores.reduce((acc, r) => acc + r.total, 0)
            )}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Ventas Mañana"
            value={formatMoney(totalGeneral)} //TODO Agregar ventas de despacho
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Ventas Tarde"
            value={0} //TODO Agregar ventas de despacho
            color="warning"
          />
        </Grid>
      </Grid>
      <DataTable
        title="Repartidores"
        headers={["Nombre", "Regreso", "Cambios", "Extra", "Notas", "Total"]}
        rows={repartidores.map((r) => [
          r.nombre,
          r.regreso,
          r.cambios,
          r.extra,
          formatMoney(r.notas),
          formatMoney(r.total),
        ])}
      />
      <DataTable
        title="Despacho mañana"
        headers={["Categoría", "Total Categoría"]}
        rows={corte.map((c) => [
          c.categoria,
          formatMoney(c.total_por_categoria),
        ])}
      />

      {/* <DataTable
        title="Despacho tarde"
        headers={["Categoría", "Total Categoría"]}
        rows={corte.map((c) => {
          c.categoria, formatMoney(c.total_por_categoria);
        })}
      /> */}
      {/* // TODO: Hacer la tabla de la Tarde */}
      {/* <DataTable
        title="Despacho Tarde"
        headers={[
          "Categoria",
          "Hay",
          "Ingresa",
          "Queda",
          "Precio",
          "Consumo",
          "Total",
        ]}
        rows={despachoTarde.map((d) => [
          d.categoria,
          d.hay,
          d.ingresa,
          d.queda,
          d.precio,
          d.consumo,
          d.total,
        ])}
      />  */}
    </Sidebar>
  );
};
