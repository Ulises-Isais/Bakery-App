import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";

interface Props extends Omit<TextFieldProps, "select" | "children"> {
  label: string;
  name: string;
  children: React.ReactNode;
}

export const SelectInput = ({ label, children, ...props }: Props) => {
  const [field, meta] = useField({ name: props.name });

  return (
    <TextField
      select
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    >
      {children}
    </TextField>
  );
};
