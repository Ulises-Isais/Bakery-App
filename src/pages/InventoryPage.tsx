import { Typography } from "@mui/material";
import { Sidebar } from "../components";
import { DataTable } from "../components/DataTable";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { fetchInventory } from "../store/inventory/inventorySlice";

export const InventoryPage = () => {
  const dispatch = useAppDispatch();

  const { error, items, loading } = useAppSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>
        Inventario
      </Typography>

      <DataTable
        title={""}
        headers={[
          "Producto",
          "Entraron",
          "Quedan",
          "Unidad",
          "Proveedor",
          "Mínimo",
          "Último ingreso",
          "Observaciones",
        ]}
        rows={items.map((item) => [
          item.producto,
          item.entraron,
          item.quedan,
          item.unidad,
          item.proveedor,
          item.minimo,
          item.fechaUltimoIngreso,
          item.observaciones,
        ])}
      />
    </Sidebar>
  );
};
