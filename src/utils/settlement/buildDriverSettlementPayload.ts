import type {
  DriverSettlementPayload,
  SettlementFormValues,
} from "../../types/settlement";

export const buildDriverSettlementPayload = (
  values: SettlementFormValues,
): DriverSettlementPayload => {
  return {
    id_repartidor: Number(values.repartidor),
    fecha: values.fecha,
    total: values.total === "" ? 0 : values.total,
    dinero_pendiente:
      values.dineroPendiente === "" ? 0 : values.dineroPendiente,
    notas: values.notas === "" ? 0 : values.notas,

    categorias: values.charolas.map((cat) => ({
      id_categoria: cat.id_categoria,
      cantidad_devuelta:
        cat.cantidad_devuelta === "" ? 0 : cat.cantidad_devuelta,
      cantidad_cambios: cat.cantidad_cambios === "" ? 0 : cat.cantidad_cambios,
      extra: cat.extra === "" ? 0 : cat.extra,
    })),
  };
};
