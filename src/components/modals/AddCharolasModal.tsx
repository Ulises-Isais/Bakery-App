import {
  Box,
  Button,
  Dialog,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { TextInput } from "../TextInput";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addCharolas } from "../../store/sales/charolasSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AddCharolasModal = ({ open, onClose }: Props) => {
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
          initialValues={{ repartidor: "", producto: "", cantidad: "" }}
          validationSchema={Yup.object({
            producto: Yup.string().required("Selecciona un producto"),
            repartidor: Yup.string().required("Selecciona un repartidor"),
            cantidad: Yup.number()

              .min(1, "Debe ser mayor a 0")
              .required("Cantidad requerida"),
          })}
          onSubmit={async (values, { resetForm }) => {
            const payload = {
              id_categoria: Number(values.producto),
              id_repartidor: Number(values.repartidor),
              cantidad: Number(values.cantidad),
            };

            const result = await dispatch(addCharolas(payload));

            if (addCharolas.fulfilled.match(result)) {
              resetForm();
              onClose(); // dispara refresh
            }

            if (addCharolas.rejected.match(result)) {
              // aquí puedes mostrar snackbar / alert
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
              <TextField
                select
                fullWidth
                name="producto"
                label="Producto"
                value={values.producto}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.producto && Boolean(errors.producto)}
                helperText={touched.producto && errors.producto}
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Selecciona un producto</MenuItem>
                {categorias.map((cat) => (
                  <MenuItem
                    key={cat.id_categoria}
                    value={cat.id_categoria.toString()}
                  >
                    {cat.nombre}
                  </MenuItem>
                ))}
              </TextField>

              {/* Cantidad */}
              <TextInput
                name="cantidad"
                label="Cantidad"
                type="number"
                placeholder="0"
              />

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
