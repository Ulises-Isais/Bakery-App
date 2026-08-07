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
import type { ValidationError } from "../../utils/settlement";

interface Props {
  validationErrors: ValidationError[];
}

const centeredNumberInput = {
  htmlInput: {
    style: {
      textAlign: "center" as const,
    },
  },
};
export const CierreRepartidorTable = ({ validationErrors }: Props) => {
  const { values, setFieldValue } = useFormikContext<SettlementFormValues>();
  const getFieldError = (
    idCategoria: number,
    field: "cantidad_devuelta" | "cantidad_cambios",
  ) => {
    return validationErrors.find(
      (error) => error.id_categoria === idCategoria && error.field === field,
    );
  };

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
          {values.charolas.map((ch, index) => {
            const devolucionError = getFieldError(
              ch.id_categoria,
              "cantidad_devuelta",
            );

            const cambiosError = getFieldError(
              ch.id_categoria,
              "cantidad_cambios",
            );
            return (
              <TableRow key={ch.id_charola}>
                <TableCell>{ch.categoria}</TableCell>
                <TableCell align="center">{ch.cantidad}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    type="number"
                    sx={{ minWidth: 90 }}
                    value={ch.cantidad_devuelta}
                    error={Boolean(devolucionError)}
                    helperText={devolucionError?.message}
                    slotProps={centeredNumberInput}
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
                    sx={{ minWidth: 90 }}
                    value={ch.cantidad_cambios}
                    slotProps={centeredNumberInput}
                    error={Boolean(cambiosError)}
                    helperText={cambiosError?.message}
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
                    sx={{ minWidth: 90 }}
                    value={ch.extra}
                    slotProps={centeredNumberInput}
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
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
