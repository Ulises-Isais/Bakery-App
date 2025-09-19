import { Typography } from "@mui/material";
import { Sidebar } from "../components";
import { DataTable } from "../components/DataTable";

export const InventoryPage = () => {
  return (
    <Sidebar>
      <Typography variant="h4" gutterBottom>
        Inventario
      </Typography>

      <DataTable title={""} headers={["Cantidad"]} rows={[]} />
    </Sidebar>
  );
};
