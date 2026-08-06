import { useFormikContext } from "formik";
import {
  validateSettlementBusinessRules,
  type ValidationError,
} from "../../utils/settlement";
import type { SettlementFormValues } from "../../types/settlement";
import { useEffect } from "react";

interface Props {
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationError[]>>;
}

export const SettlementValidation = ({ setValidationErrors }: Props) => {
  const { values } = useFormikContext<SettlementFormValues>();

  useEffect(() => {
    const validation = validateSettlementBusinessRules(values.charolas);

    setValidationErrors(validation.errors);
  }, [values.charolas, setValidationErrors]);

  return null;
};
