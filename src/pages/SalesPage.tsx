import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import { Sidebar } from "../components";
import { Cards } from "../components/Cards";
import { DataTable } from "../components/DataTable";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchDespacho } from "../store/sales/salesDespachoSlice";
import { formatMoney } from "../helpers";

export const SalesPage = () => {
  const dispatch = useAppDispatch();

  const { loading, error, despacho } = useAppSelector(
    (state) => state.salesDespacho
  );

  useEffect(() => {
    dispatch(fetchDespacho({ fecha: "2025-09-12", turno: "tarde" }));
  }, [dispatch]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>
        Ventas del día "Fecha"
      </Typography>
      {/* Cards con métricas */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards title={"Venta Mañana"} value={0} color={"primary"} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Cards title={"Ventas Tarde"} value={0} color={"primary"} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Cards title={"Repartidores"} value={0} color={"primary"} />
        </Grid>
      </Grid>
      {/* //TODO: Graficas */}
      {/* Tablas */}

      {/* <DataTable
        title="Despacho Mañana"
        headers={[
          "Producto",
          "Habían",
          "Ingresan",
          "Quedan",
          "Vendido",
          "Total",
        ]}
        rows={despacho.map((d) => [
          d.producto,
          d.cantidad_inicial,
          d.ingreso,
          d.quedan,
          d.vendido,
          d.total,
        ])}
      /> */}

      <DataTable
        title={"Despacho Mañana"}
        headers={[
          "Categoria",
          "Precio",
          "Cantidad",
          "Ingresan",
          "Quedan",
          "Total",
        ]}
        rows={[]}
      />

      <DataTable
        title={"Despacho Tarde"}
        headers={[
          "Categoria",
          "Producto",
          "Cantidad inicial",
          "Ingreso",
          "Quedan",
          "Vendido",
          "Total",
        ]}
        rows={despacho.map((d) => [
          d.categoria,
          d.producto,
          d.cantidad_inicial,
          d.ingreso,
          d.quedan,
          d.vendido,
          formatMoney(d.total),
        ])}
      />

      <DataTable
        title={"Leche"}
        headers={[
          "Categoria",
          "Precio",
          "Cantidad",
          "Ingresan",
          "Quedan",
          "Consumo",
          "Total",
        ]}
        rows={[]}
      />
      <DataTable
        title={"Repartidores"}
        headers={[
          "Nombre",
          "Categoria",
          "Cantidad",
          "Extra",
          "Regreso",
          "$$$ Regreso",
          "Cambios",
          "$$$ Cambios",
          "Total",
          "Debe",
        ]}
        rows={[]}
      />
    </Sidebar>
  );
};
