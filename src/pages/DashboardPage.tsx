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

  // Estado del slice
  const {
    repartidores,
    loading: loadingSales,
    error: errorSales,
  } = useAppSelector((state) => state.salesDriver);

  const totalGeneralFinal = useAppSelector(selectTotalGeneralConRepartidores);

  const { turnos } = useAppSelector((state) => state.salesCards);

  const manana = turnos["mañana"];
  const tarde = turnos["tarde"];

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
            color="#5A5E9C"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Ventas Mañana"
            value={formatMoney(manana?.total ?? 0)}
            color="#333382"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Ventas Tarde"
            value={formatMoney(tarde?.total ?? 0)}
            color="#2b348c"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Total General"
            value={formatMoney(totalGeneralFinal)} //TODO Cambiar colores de las cards
            color="#333382"
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
        rows={
          manana
            ? manana.categorias.map((c) => [c.categoria, formatMoney(c.total)])
            : []
        }
      />

      <DataTable
        title="Despacho tarde"
        headers={["Categoría", "Total Categoría"]}
        rows={
          tarde
            ? tarde.categorias.map((c) => [c.categoria, formatMoney(c.total)])
            : []
        }
      />
    </Sidebar>
  );
};
