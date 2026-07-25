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
import type { CharolaRepartidor } from "../../store/sales/salesCierreRepartidorSlice";

interface Props {
  charolas: CharolaRepartidor[];
}

export const CierreRepartidorTable = ({ charolas }: Props) => {
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
          {charolas.map((ch) => (
            <TableRow key={ch.id_charola}>
              <TableCell>{ch.categoria}</TableCell>
              <TableCell align="center">{ch.cantidad}</TableCell>
              <TableCell>
                <TextField size="small" type="number" fullWidth />
              </TableCell>
              <TableCell>
                <TextField size="small" type="number" fullWidth />
              </TableCell>
              <TableCell>
                <TextField size="small" type="number" fullWidth />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
