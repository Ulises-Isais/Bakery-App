import { Grid, Typography } from "@mui/material";
import { Sidebar } from "../components";
import { Cards } from "../components/Cards";
import { DataTable } from "../components/DataTable";

export const SalesPage = () => {
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
          "Precio",
          "Cantidad",
          "Ingresan",
          "Quedan",
          "Total",
        ]}
        rows={[]}
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
