import {
  Box,
  Button,
  Dialog,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

import { TextInput } from "../TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addCharolas } from "../../store/sales/charolasSlice";
import { SelectInput } from "../SelectInput";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const AddCharolasModal = ({
  open,
  onClose,
  onSuccess,
  onError,
}: Props) => {
  const dispatch = useAppDispatch();
  // leer categorias y repartidores
  const categorias = useAppSelector((state) => state.categorias.items);
  const repartidores = useAppSelector((state) => state.repartidores.items);
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        if (reason === "escapeKeyDown") return;
        onClose();
      }}
      maxWidth="sm"
      fullWidth
    >
      <Box p={3}>
        <Typography variant="h6" mb={3}>
          Agregar charolas
        </Typography>
        <Formik
          initialValues={{
            repartidor: "",
            productos: [
              {
                producto: "",
                cantidad: "",
              },
            ],
          }}
          validationSchema={Yup.object({
            repartidor: Yup.string().required("Selecciona un repartidor"),
            productos: Yup.array().of(
              Yup.object({
                producto: Yup.string().required("Selecciona un producto"),

                cantidad: Yup.number()
                  .typeError("Cantidad requerida")
                  .min(1, "Debe ser mayor a 0")
                  .required("Cantidad requerida"),
              }),
            ),
          })}
          onSubmit={async (values, { resetForm }) => {
            const payload = {
              id_repartidor: Number(values.repartidor),

              productos: values.productos.map((p) => ({
                id_categoria: Number(p.producto),
                cantidad: Number(p.cantidad),
              })),
            };

            const result = await dispatch(addCharolas(payload));

            if (addCharolas.fulfilled.match(result)) {
              resetForm();
              onSuccess("Charolas registradas correctamente");
              onClose(); // dispara refresh
            }

            if (addCharolas.rejected.match(result)) {
              onError("No fue posible registrar las charolas");
            }
          }}
        >
          {({
            isSubmitting,
            values,
            handleChange,
            errors,
            touched,
            handleBlur,
          }) => (
            <Form>
              {/* Select repartidor */}

              <TextField
                select
                fullWidth
                name="repartidor"
                label="Repartidor"
                value={values.repartidor}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.repartidor && Boolean(errors.repartidor)}
                helperText={touched.repartidor && errors.repartidor}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Selecciona un repartidor</MenuItem>
                {repartidores.map((r) => (
                  <MenuItem
                    key={r.id_repartidor}
                    value={r.id_repartidor.toString()}
                  >
                    {r.nombre}
                  </MenuItem>
                ))}
              </TextField>

              {/* Select producto */}
              <FieldArray name="productos">
                {({ push, remove }) => (
                  <>
                    {values.productos.map((_, index) => (
                      <Box key={index} mb={2}>
                        {/* Select */}
                        <SelectInput
                          name={`productos.${index}.producto`}
                          label="Producto"
                          sx={{ mb: 2 }}
                        >
                          <MenuItem value="">Selecciona un producto</MenuItem>
                          {categorias.map((cat) => {
                            const selected = values.productos.some(
                              (p, i) =>
                                i !== index &&
                                p.producto === cat.id_categoria.toString(),
                            );

                            return (
                              <MenuItem
                                key={cat.id_categoria}
                                value={cat.id_categoria.toString()}
                                disabled={selected}
                              >
                                {cat.nombre}
                              </MenuItem>
                            );
                          })}
                        </SelectInput>

                        {/* Cantidad */}
                        <TextInput
                          name={`productos.${index}.cantidad`}
                          label="Cantidad"
                          type="number"
                          placeholder="0"
                        />
                        {values.productos.length > 1 && (
                          <Box
                            mt={1}
                            display={"flex"}
                            justifyContent={"flex-end"}
                          >
                            <Button
                              type="button"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => remove(index)}
                            >
                              Eliminar
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))}

                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => {
                        push({
                          producto: "",
                          cantidad: "",
                        });
                      }}
                    >
                      + Agregar producto
                    </Button>
                  </>
                )}
              </FieldArray>

              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={onClose} variant="outlined">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Guardar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
