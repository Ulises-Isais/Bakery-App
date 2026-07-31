import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import type { SettlementFormValues } from "../../types/settlement";

export const CierreRepartidorTable = () => {
  const { values, setFieldValue } = useFormikContext<SettlementFormValues>();

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Categoria</TableCell>
            <TableCell align="center">Enviadas</TableCell>
            <TableCell align="center">Regresan</TableCell>
            <TableCell align="center">Cambios</TableCell>
            <TableCell align="center">Extras</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.charolas.map((ch, index) => (
            <TableRow key={ch.id_charola}>
              <TableCell>{ch.categoria}</TableCell>
              <TableCell align="center">{ch.cantidad}</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  type="number"
                  fullWidth
                  value={ch.cantidad_devuelta}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFieldValue(
                      `charolas.${index}.cantidad_devuelta`,
                      value === "" ? "" : Number(value),
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  type="number"
                  fullWidth
                  value={ch.cantidad_cambios}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFieldValue(
                      `charolas.${index}.cantidad_cambios`,
                      value === "" ? "" : Number(value),
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  type="number"
                  fullWidth
                  value={ch.extra}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFieldValue(
                      `charolas.${index}.extra`,
                      value === "" ? "" : Number(value),
                    );
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
