import { Grid, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { Cards } from "../components/Cards";
import { DataTable } from "../components";
import { useEffect } from "react";
import { fetchSales } from "../store/sales/salesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchSalesCards } from "../store/sales/salesSliceCards";

export const DashboardPage = () => {
  const dispatch = useAppDispatch();

  // Estado del slice
  const { repartidores, loading, error } = useAppSelector(
    (state) => state.sales
  );

  const { corte, totalGeneral } = useAppSelector((state) => state.salesCards);

  // Llamada al backend al montar el componente

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchSalesCards({ fecha: "2025-09-12", turno: "mañana" }));
  }, [dispatch]);

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>
        Inicio
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Total venta repartidores"
            value={repartidores.reduce((acc, r) => acc + r.total, 0)}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Ventas Mañana"
            value={totalGeneral} //TODO Agregar ventas de despacho
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
          r.notas,
          r.total,
        ])}
      />
      <DataTable
        title="Despacho mañana"
        headers={["Categoria", "Total Categoria"]}
        rows={corte.map((c) => [c.id_categoria, c.total_por_categoria])}
      />
      {/* <DataTable
        title="Despacho Mañana"
        headers={[
          "Categoria",
          "Hay",
          "Ingresa",
          "Quedan",
          "Precio",
          "Vendido",
          "Total",
        ]}
        rows={despachoManana.map((d) => [
          d.categoria,
          d.hay,
          d.ingresa,
          d.quedan,
          d.precio,
          d.consumo,
          d.total,
        ])}
      /> */}
      {/* <DataTable
        title="Despacho Mañana"
        headers={[
          "Categoria",
          "Hay",
          "Ingresa",
          "Queda",
          "Precio",
          "Consumo",
          "Total",
        ]}
        rows={despachoManana.map((d) => [
          d.categoria,
          d.hay,
          d.ingresa,
          d.queda,
          d.precio,
          d.consumo,
          d.total,
        ])}
      />

      <DataTable
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
      /> */}
    </Sidebar>
  );
};
