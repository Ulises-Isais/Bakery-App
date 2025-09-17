import { Grid, Typography } from "@mui/material";
import { Sidebar } from "../components/Sidebar";
import { Cards } from "../components/Cards";
import { DataTable } from "../components";

// Tipos
interface Repartidor {
  nombre: string;
  panVendido: number;
  extra: number;
  regreso: number;
  cambios: number;
  total: number;
}

interface Despacho {
  categoria: string;
  hay: number;
  ingresa: number;
  queda: number;
  precio: number;
  consumo: number;
  total: number;
}

// Datos de ejemplo
const repartidores: Repartidor[] = [
  {
    nombre: "Beto",
    panVendido: 50,
    extra: 5,
    regreso: 2,
    cambios: 1,
    total: 58,
  },
  {
    nombre: "Jonh",
    panVendido: 30,
    extra: 3,
    regreso: 1,
    cambios: 2,
    total: 36,
  },
];

const despachoManana: Despacho[] = [
  {
    categoria: "Pan blanco",
    hay: 100,
    ingresa: 20,
    queda: 80,
    precio: 10,
    consumo: 40,
    total: 400,
  },
  {
    categoria: "Pan integral",
    hay: 50,
    ingresa: 10,
    queda: 45,
    precio: 12,
    consumo: 15,
    total: 180,
  },
];

const despachoTarde: Despacho[] = [
  {
    categoria: "Pan dulce",
    hay: 60,
    ingresa: 15,
    queda: 50,
    precio: 15,
    consumo: 25,
    total: 375,
  },
  {
    categoria: "Bollería",
    hay: 40,
    ingresa: 5,
    queda: 35,
    precio: 20,
    consumo: 10,
    total: 200,
  },
];

export const DashboardPage = () => {
  return (
    <Sidebar>
      {/* Contenedor principal para ocupar toda la pantalla */}

      {/* Titulo principal */}
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Cards con métricas principales */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Total Pan Vendido"
            value={repartidores.reduce((acc, r) => acc + r.panVendido, 0)}
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Ventas Mañana"
            value={despachoManana.reduce((acc, d) => acc + d.total, 0)}
            color="success"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Cards
            title="Ventas Tarde"
            value={despachoTarde.reduce((acc, d) => acc + d.total, 0)}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Tablas con datos */}
      <DataTable
        title="Repartidores"
        headers={[
          "Nombre",
          "Pan Vendido",
          "Extra",
          "Regreso",
          "Cambios",
          "Total",
        ]}
        rows={repartidores.map((r) => [
          r.nombre,
          r.panVendido,
          r.extra,
          r.regreso,
          r.cambios,
          r.total,
        ])}
      />
      <DataTable
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
      />
    </Sidebar>
  );
};
