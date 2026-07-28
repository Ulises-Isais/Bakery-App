import {
  Box,
  Button,
  Dialog,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  clearCierreRepartidor,
  fetchCierreRepartidor,
} from "../../store/sales/salesCierreRepartidorSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { SelectInput } from "../SelectInput";
import { useState } from "react";
import { CierreRepartidorTable } from "./CierreRepartidorTable";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DEFAULT_DATE = "2025-09-12";

export const CierreRepartidorModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const repartidores = useAppSelector((state) => state.repartidores.items);

  const { charolas, loading } = useAppSelector(
    (state) => state.salesCierreRepartidor,
  );

  const [showSettlement, setShowSettlement] = useState(false);

  const handleClose = () => {
    dispatch(clearCierreRepartidor());

    setShowSettlement(false);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        if (reason === "escapeKeyDown") return;

        handleClose();
      }}
      maxWidth="sm"
      fullWidth
    >
      <Box p={3}>
        <Typography variant="h6" mb={3}>
          Cierre de repartidor
        </Typography>
        <Formik
          initialValues={{
            repartidor: 0,
            fecha: DEFAULT_DATE,
            charolas: [],
            total: "",
            dineroPendiente: "",
            notas: "",
          }}
          validationSchema={Yup.object({
            repartidor: Yup.number()
              .moreThan(0, "Selecciona un repartidor")
              .required("Selecciona un repartidor"),
            // fecha: Yup.string().required("Selecciona una fecha"),
          })}
          onSubmit={async (values) => {
            const result = await dispatch(
              fetchCierreRepartidor({
                id_repartidor: Number(values.repartidor),
                fecha: values.fecha,
              }),
            );

            if (fetchCierreRepartidor.fulfilled.match(result)) {
              setShowSettlement(true);
            }

            // const charolasFormulario = result.payload.map((charola) => ({
            //   ...charola,
            //   regresan: "",
            //   cambios: "",
            //   extras: "",
            //   notas: "",
            // }));

            // setFieldValue("charolas", charolasFormulario)

            // setShowSettlement(true)
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              {/* Repartidor */}

              <SelectInput name="repartidor" label="Repartidor" sx={{ mb: 2 }}>
                <MenuItem value="">Selecciona un repartidor</MenuItem>

                {repartidores.map((r) => (
                  <MenuItem
                    key={r.id_repartidor}
                    value={r.id_repartidor.toString()}
                  >
                    {r.nombre}
                  </MenuItem>
                ))}
              </SelectInput>

              {/* Fecha */}

              <TextField
                fullWidth
                disabled
                label="Fecha"
                value={values.fecha}
                sx={{ mb: 2 }}
              />

              {/* Buscar */}

              {!showSettlement && (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || isSubmitting}
                >
                  Buscar
                </Button>
              )}

              {/* Tabla */}

              {showSettlement && <CierreRepartidorTable charolas={charolas} />}

              {showSettlement && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Información de la venta
                  </Typography>
                  <Box display="flex" gap={2} sx={{ mb: 2 }}>
                    <TextField fullWidth label="Total Vendido" type="number" />
                    <TextField
                      fullWidth
                      label="Dinero pendiente"
                      type="number"
                    />
                  </Box>
                  <TextField fullWidth label="Notas" type="number" />
                </Box>
              )}

              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancelar
                </Button>
                {showSettlement && (
                  <Button variant="contained">Guardar cierre</Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
