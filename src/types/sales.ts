import type { CharolaRepartidor } from "../store/sales/salesCierreRepartidorSlice";

export interface CharolaCierre extends CharolaRepartidor {
  regresan: number | "";
  cambios: number | "";
  extras: number | "";
  notas: number | "";
}
