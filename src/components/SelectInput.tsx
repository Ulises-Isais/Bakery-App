import { TextField } from "@mui/material";
import { useField } from "formik";

interface Props {
  label: string;
  name: string;
  children: React.ReactNode;
  [x: string]: any;
}

export const SelectInput = ({ label, children, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      select
      fullWidth
      label={label}
      {...field}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    >
      {children}
    </TextField>
  );
};
