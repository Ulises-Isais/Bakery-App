import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { formatMoney } from "../helpers";

import { Sidebar } from "../components/Sidebar";
import { Cards } from "../components/Cards";
import { DataTable } from "../components";
import { fetchSales } from "../store/sales/salesSlice";
import { fetchSalesCards } from "../store/sales/salesSliceCards";
import { selectTotalGeneralConRepartidores } from "../store/sales/selectors";

export const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const {
    repartidores,
    loading: loadingSales,
    error: errorSales,
  } = useAppSelector((state) => state.salesDriver);

  const totalGeneralFinal = useAppSelector(selectTotalGeneralConRepartidores);

  const { turnos } = useAppSelector((state) => state.salesCards);

  const manana = turnos["mañana"];
  const tarde = turnos["tarde"];

  const isAdmin = user?.role === "admin";
  const isDespacho = user?.role === "despacho";
  const turno = user?.turno; // mañana || tarde

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

  const cards = [];

  if (isAdmin) {
    cards.push(
      {
        title: "Ventas mañana",
        value: manana?.total ?? 0,
      },
      {
        title: "Ventas tarde",
        value: tarde?.total ?? 0,
      },
      {
        title: "Ventas repartidores",
        value: repartidores.reduce((a, r) => a + r.total, 0),
      },
      {
        title: "Total general",
        value: totalGeneralFinal,
      },
    );
  }
  if (isDespacho) {
    cards.push({
      title: turno === "mañana" ? "Venta mañana" : "Venta tarde",
      value: turno === "mañana" ? manana?.total : tarde?.total,
      color: "#333382",
    });
  }
  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>
        Inicio
      </Typography>
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          {cards.map((card, i) => (
            <Grid key={i} size={{ xs: 12, md: 4 }}>
              <Cards
                title={card.title}
                value={formatMoney(card.value)}
                color={"#333382"}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      {isAdmin && (
        <>
          <DataTable
            title="Repartidores"
            headers={[
              "Nombre",
              "Regreso",
              "Cambios",
              "Extra",
              "Notas",
              "Total",
            ]}
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
            rows={
              manana
                ? manana.categorias.map((c) => [
                    c.categoria,
                    formatMoney(c.total),
                  ])
                : []
            }
          />

          <DataTable
            title="Despacho tarde"
            headers={["Categoría", "Total Categoría"]}
            rows={
              tarde
                ? tarde.categorias.map((c) => [
                    c.categoria,
                    formatMoney(c.total),
                  ])
                : []
            }
          />
        </>
      )}
    </Sidebar>
  );
};
