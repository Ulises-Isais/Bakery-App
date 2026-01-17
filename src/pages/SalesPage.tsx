import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import { Sidebar } from "../components";
import { Cards } from "../components/Cards";
import { DataTable } from "../components/DataTable";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchDespacho } from "../store/sales/salesDespachoSlice";
import { formatMoney } from "../helpers";
import { fetchSalesCards } from "../store/sales/salesSliceCards";

export const SalesPage = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { loading, error, despacho } = useAppSelector(
    (state) => state.salesDespacho
  );

  const { totalesPorTurno } = useAppSelector((state) => state.salesCards);

  useEffect(() => {
    dispatch(fetchDespacho({ fecha: "2025-09-12" }));
    dispatch(fetchSalesCards({ fecha: "2025-09-12" }));
  }, [dispatch]);

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  const despachoManana = despacho.filter((d) => d.turno === "mañana");
  const despachoTarde = despacho.filter((d) => d.turno === "tarde");

  const despachoPorTurno = despacho.filter((d) => d.turno === user?.turno);

  const cardsToShow = [];
  if (user?.role === "admin") {
    cardsToShow.push(
      {
        title: "Venta mañana",
        value: totalesPorTurno?.mañana ?? 0,
        color: "#333382",
      },
      {
        title: "Venta tarde",
        value: totalesPorTurno?.tarde ?? 0,
        color: "#333382",
      },
      {
        title: "Repartidores",
        value: 0,
        color: "#333382",
      }
    );
  }

  if (user?.role === "despacho") {
    cardsToShow.push({
      title: user.turno === "mañana" ? "Venta mañana" : "Venta tarde",
      value:
        user.turno === "mañana"
          ? totalesPorTurno?.mañana
          : totalesPorTurno?.tarde,
      color: "#333382",
    });
  }
  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>
        Ventas del día "Fecha"
      </Typography>
      {/* Cards con métricas */}
      <Grid container spacing={3} mb={4}>
        {cardsToShow.map((card, index) => (
          <Grid key={index} size={{ xs: 12, md: 4 }}>
            <Cards
              title={card.title}
              value={formatMoney(card.value)}
              color={card.color}
            />
          </Grid>
        ))}
      </Grid>
      {/* Tablas */}
      {user?.role === "admin" && (
        <>
          <DataTable
            title="Despacho mañana"
            headers={[
              "Categoria",
              "Producto",
              "Cantidad inicial",
              "Ingreso",
              "Quedan",
              "Vendido",
              "Total",
            ]}
            rows={despachoManana.map((d) => [
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
            title="Despacho tarde"
            headers={[
              "Categoria",
              "Producto",
              "Cantidad inicial",
              "Ingreso",
              "Quedan",
              "Vendido",
              "Total",
            ]}
            rows={despachoTarde.map((d) => [
              d.categoria,
              d.producto,
              d.cantidad_inicial,
              d.ingreso,
              d.quedan,
              d.vendido,
              formatMoney(d.total),
            ])}
          />
        </>
      )}
      {user?.role === "despacho" && (
        <DataTable
          title={`Despacho ${user.turno}`}
          headers={[
            "Categoria",
            "Producto",
            "Cantidad inicial",
            "Ingreso",
            "Quedan",
            "Vendido",
            "Total",
          ]}
          rows={despachoPorTurno.map((d) => [
            d.categoria,
            d.producto,
            d.cantidad_inicial,
            d.ingreso,
            d.quedan,
            d.vendido,
            formatMoney(d.total),
          ])}
        />
      )}

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
