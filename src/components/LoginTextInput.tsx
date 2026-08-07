import { ErrorMessage, useField } from "formik";
import "../styles/login.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const LoginTextInput = ({ ...props }: Props) => {
  const [field] = useField({ name: props.name });

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
