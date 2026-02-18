import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";

import { Sidebar } from "../components";
import { Cards } from "../components/Cards";
import { DataTable } from "../components/DataTable";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchDespacho } from "../store/sales/salesDespachoSlice";
import { formatMoney } from "../helpers";
import { fetchSalesCards } from "../store/sales/salesSliceCards";
import {
  selectDespachoSinRefri,
  selectRepartidoresTable,
  selectTotalRepartidoresFromTable,
} from "../store/sales/selectors";
import { fetchSalesRepartidoresTable } from "../store/sales/salesRepartidoresTableSlice";
import { AddCharolasModal } from "../components/modals/AddCharolasModal";
import { fetchCategorias } from "../store/catalogs/categoriesSlice";
import { fetchRepartidores } from "../store/catalogs/repartidoresSlice";

export const SalesPage = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = user?.role === "admin";
  const isDespacho = user?.role === "despacho";
  const turno = user?.turno; // mañana || tarde

  const [openCharolas, setOpenCharolas] = useState(false);
  const [openCorte, setOpenCorte] = useState(false);
  const [openRepartidores, setOpenRepartidores] = useState(false);

  const { loading, error, despacho } = useAppSelector(
    (state) => state.salesDespacho,
  );

  const tableManana = useAppSelector((state) =>
    selectDespachoSinRefri(state, "mañana"),
  );
  const tableTarde = useAppSelector((state) =>
    selectDespachoSinRefri(state, "tarde"),
  );

  const { totalesPorTurno } = useAppSelector((state) => state.salesCards);

  const totalesRepartidores = useAppSelector(selectTotalRepartidoresFromTable);

  const { rows: repartidoresRows, loading: loadingRepartidores } =
    useAppSelector(selectRepartidoresTable);

  useEffect(() => {
    dispatch(fetchDespacho({ fecha: "2025-09-12" }));
    dispatch(fetchSalesCards({ fecha: "2025-09-12" }));
    dispatch(fetchSalesRepartidoresTable({ fecha: "2025-09-12" }));
    dispatch(fetchCategorias());
    dispatch(fetchRepartidores());
  }, [dispatch]);

  const refreshData = () => {
    dispatch(fetchDespacho({ fecha: "2025-09-12" }));
    dispatch(fetchSalesCards({ fecha: "2025-09-12" }));
    dispatch(fetchSalesRepartidoresTable({ fecha: "2025-09-12" }));
  };

  if (loading && loadingRepartidores) {
    return <Typography>Cargando...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  // const despachoManana = despacho.filter((d) => d.turno === "mañana");
  // const despachoTarde = despacho.filter((d) => d.turno === "tarde");

  const cardsToShow = [];
  if (isAdmin) {
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
        value: totalesRepartidores,
        color: "#333382",
      },
    );
  }

  if (isDespacho) {
    cardsToShow.push({
      title: turno === "mañana" ? "Venta mañana" : "Venta tarde",
      value:
        turno === "mañana" ? totalesPorTurno?.mañana : totalesPorTurno?.tarde,
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

      <Grid container spacing={2} mb={4}>
        {isAdmin && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenCharolas(true)}
            >
              Agregar charolas
            </Button>
          </Grid>
        )}

        {isAdmin ||
          (isDespacho && (
            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setOpenCorte(true)}
              >
                Corte despacho
              </Button>
            </Grid>
          ))}

        {isAdmin && (
          <Grid size={{ xs: 12, md: 4 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setOpenRepartidores(true)}
            >
              Contar repartidores
            </Button>
          </Grid>
        )}
      </Grid>
      {/* Tablas */}
      {isAdmin && (
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
            rows={tableManana.map((d) => [
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
            rows={tableTarde.map((d) => [
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
      {isDespacho && (
        <DataTable
          title={`Despacho ${turno}`}
          headers={[
            "Categoria",
            "Producto",
            "Cantidad inicial",
            "Ingreso",
            "Quedan",
            "Vendido",
            "Total",
          ]}
          rows={(turno === "mañana" ? tableManana : tableTarde).map((d) => [
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
          "Producto",
          "Precio",
          "Cantidad",
          "Ingresan",
          "Quedan",
          "Consumo",
          "Total",
        ]}
        rows={despacho
          .filter((d) => d.id_categoria === 8)
          .map((d) => [
            d.categoria,
            d.producto,
            formatMoney(d.precio),
            d.cantidad_inicial,
            d.ingreso,
            d.quedan,
            d.vendido,
            formatMoney(d.total),
          ])}
      />

      {isAdmin && (
        <DataTable
          title={"Repartidores"}
          headers={[
            "Nombre",
            "Categoria",
            "Cantidad",
            "Extra",
            "Regreso",
            "$ Regreso",
            "Cambios",
            "$ Cambios",
            "Total",
            "Debe",
          ]}
          rows={repartidoresRows.map((r) => [
            r.nombre,
            r.categoria,
            r.cantidad,
            r.extra,
            r.regreso,
            formatMoney(r.totalRegreso),
            r.cambios,
            formatMoney(r.totalCambios),
            formatMoney(r.total),
            formatMoney(r.debe),
          ])}
        />
      )}
      <AddCharolasModal
        open={openCharolas}
        onClose={() => {
          setOpenCharolas(false);
          refreshData();
        }}
      />
    </Sidebar>
  );
};
