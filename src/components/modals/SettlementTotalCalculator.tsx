import { useEffect } from "react";
import { useFormikContext } from "formik";
import type { SettlementFormValues } from "../../types/settlement";
import { calculateSettlementTotal } from "../../utils/settlement/calculateSettlementTotal";

export const SettlementTotalCalculator = () => {
  const { values, setFieldValue } = useFormikContext<SettlementFormValues>();

  useEffect(() => {
    const total = calculateSettlementTotal({
      charolas: values.charolas,
      notas: values.notas,
      dineroPendiente: values.dineroPendiente,
    });
    if (values.total !== total) {
      setFieldValue("total", total);
    }
  }, [
    values.charolas,
    values.notas,
    values.total,
    values.dineroPendiente,
    setFieldValue,
  ]);
  return null;
};
