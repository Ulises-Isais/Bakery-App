import { Dialog, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { fetchDispatchClosingPreview } from "../../store/sales/dispatchClosingSlice";
import {
  selectDispatchClosing,
  selectDispatchClosingError,
  selectDispatchClosingLoading,
} from "../../store/sales/dispatchClosingSelectors";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const DispatchClosingModal = ({ open, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const closing = useAppSelector(selectDispatchClosing);
  const loading = useAppSelector(selectDispatchClosingLoading);
  const error = useAppSelector(selectDispatchClosingError);

  useEffect(() => {
    if (open === true) {
      dispatch(
        fetchDispatchClosingPreview({ fecha: "2025-09-12", turno: "mañana" }),
      );
    }
  }, [open, dispatch]);

  return (
    <Dialog open={open} onClose={onClose}>
      {loading && <Typography variant="h3">Cargando ...</Typography>}
      {error && <Typography variant="h3">Error {error}</Typography>}
      {closing && <Typography>Preview recibido</Typography>}
    </Dialog>
  );
};
