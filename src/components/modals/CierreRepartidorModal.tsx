import { useState } from "react";
import { Formik, Form, type FormikHelpers } from "formik";

import {
  Box,
  Button,
  Dialog,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  clearCierreRepartidor,
  fetchCierreRepartidor,
  saveDriverSettlement,
} from "../../store/sales/salesCierreRepartidorSlice";
import { SelectInput } from "../SelectInput";
import { CierreRepartidorTable } from "./CierreRepartidorTable";
import type { SettlementFormValues } from "../../types/settlement";
import { SettlementTotalCalculator } from "./SettlementTotalCalculator";
import {
  buildDriverSettlementPayload,
  validateSettlementBusinessRules,
  type ValidationError,
} from "../../utils/settlement";
import { SettlementValidation } from "./SettlementValidation";
import { formatMoney } from "../../helpers";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (messahe: string) => void;
}

const DEFAULT_DATE = "2025-09-12";

const initialValues: SettlementFormValues = {
  repartidor: "",
  fecha: DEFAULT_DATE,
  charolas: [],
  total: "",
  dineroPendiente: "",
  notas: "",
};

export const CierreRepartidorModal = ({
  open,
  onClose,
  onError,
  onSuccess,
}: Props) => {
  const dispatch = useAppDispatch();

  const repartidores = useAppSelector((state) => state.repartidores.items);

  const { loading } = useAppSelector((state) => state.salesCierreRepartidor);

  const [showSettlement, setShowSettlement] = useState(false);

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    [],
  );
  // Limpia el estado del cierre antes de cerral el modal
  const resetSettlement = () => {
    dispatch(clearCierreRepartidor());

    setShowSettlement(false);
  };

  const handleClose = () => {
    resetSettlement();

    onClose();
  };

  const handleSearch = async (
    values: SettlementFormValues,
    setFieldValue: FormikHelpers<SettlementFormValues>["setFieldValue"],
  ) => {
    const result = await dispatch(
      fetchCierreRepartidor({
        id_repartidor: Number(values.repartidor),
        fecha: values.fecha,
      }),
    );

    if (fetchCierreRepartidor.fulfilled.match(result)) {
      const settlementCategories = result.payload.map((category) => ({
        ...category,
        cantidad_devuelta: "",
        cantidad_cambios: "",
        extra: "",
      }));

      setFieldValue("charolas", settlementCategories);

      setShowSettlement(true);
    }
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
          Cierre de venta del repartidor
        </Typography>
        <Formik<SettlementFormValues>
          initialValues={initialValues}
          validationSchema={Yup.object({
            repartidor: Yup.number()
              .moreThan(0, "Selecciona un repartidor")
              .required("Selecciona un repartidor"),
            // fecha: Yup.string().required("Selecciona una fecha"),
          })}
          onSubmit={async (values, { resetForm }) => {
            const validation = validateSettlementBusinessRules(values.charolas);
            if (!validation.valid) {
              return;
            }
            const payload = buildDriverSettlementPayload(values);

            const result = await dispatch(saveDriverSettlement(payload));

            if (saveDriverSettlement.fulfilled.match(result)) {
              resetForm();

              onSuccess("Cierre realizado correctamente.");

              handleClose();
            }

            if (saveDriverSettlement.rejected.match(result)) {
              onError("No fue posible realizar el cierre.");
            }
          }}
        >
          {({
            values,
            isSubmitting,
            setFieldValue,
            validateForm,
            setTouched,
          }) => (
            <Form>
              <SettlementTotalCalculator />
              <SettlementValidation setValidationErrors={setValidationErrors} />
              {/* Repartidor */}
              <SelectInput name="repartidor" label="Repartidor" sx={{ mb: 3 }}>
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
                sx={{ mb: 4 }}
              />
              {/* Buscar */}
              {!showSettlement && (
                <Button
                  type="button"
                  variant="contained"
                  disabled={loading || isSubmitting}
                  onClick={async () => {
                    const errors = await validateForm();
                    if (Object.keys(errors).length > 0) {
                      setTouched({
                        repartidor: true,
                      });
                      return;
                    }
                    handleSearch(values, setFieldValue);
                  }}
                >
                  Consultar
                </Button>
              )}
              {/* Tabla */}
              {showSettlement && (
                <CierreRepartidorTable validationErrors={validationErrors} />
              )}
              {showSettlement && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Resumen del cierre
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Total Vendido"
                        value={formatMoney(Number(values.total || 0))}
                        slotProps={{
                          htmlInput: {
                            readOnly: true,
                            style: { textAlign: "center" },
                          },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Dinero pendiente"
                        type="number"
                        value={values.dineroPendiente}
                        slotProps={{
                          htmlInput: {
                            style: {
                              textAlign: "center",
                            },
                          },
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue(
                            "dineroPendiente",
                            value === "" ? "" : Number(value),
                          );
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        fullWidth
                        label="Notas"
                        type="number"
                        value={values.notas}
                        slotProps={{
                          htmlInput: {
                            style: {
                              textAlign: "center",
                            },
                          },
                        }}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue(
                            "notas",
                            value === "" ? "" : Number(value),
                          );
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancelar
                </Button>
                {showSettlement && (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      isSubmitting || loading || validationErrors.length > 0
                    }
                  >
                    Guardar cierre
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
