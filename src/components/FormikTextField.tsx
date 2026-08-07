import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";

interface Props extends Omit<TextFieldProps, "name"> {
  name: string;
}

export const FormikTextField = ({ name, ...props }: Props) => {
  const [field, meta] = useField({ name });

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched ? meta.error : ""}
    />
  );
};
