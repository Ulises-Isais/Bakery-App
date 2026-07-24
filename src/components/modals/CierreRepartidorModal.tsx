import { Box, Dialog, Typography } from "@mui/material";
import { Formik } from "formik";
import { Form } from "react-router";
import * as Yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const CierreRepartidorModal = ({ open, onClose }: Props) => {
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
          Cierre de repartidor
        </Typography>
        <Formik
          initialValues={{ repartidor: "", fecha: "" }}
          validationSchema={Yup.object({
            repartidor: Yup.string().required("Selecciona un repartidor"),
            fecha: Yup.string().required("Selecciona una fecha"),
          })}
          onSubmit={() => {}}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form></Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};
