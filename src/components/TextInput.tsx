import { ErrorMessage, useField } from "formik";
import "../styles/login.css";

interface Props {
  label: string;
  name: string;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  className?: string;
  [x: string]: any;
}

export const TextInput = ({ label, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <div className="row">
      <input
        {...field}
        {...props}
        min={props.type === "number" ? 0 : undefined}
        onKeyDown={(e) => {
          if (
            props.type === "number" &&
            (e.key === "-" || e.key === "e" || e.key === "+")
          ) {
            e.preventDefault();
          }
          props.onKeyDown?.(e);
        }}
      />
      <ErrorMessage name={props.name} component="span" className="error-text" />
    </div>
  );
};
