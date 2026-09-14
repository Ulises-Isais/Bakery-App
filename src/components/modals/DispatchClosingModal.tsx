import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect } from "react";
import { fetchDispatchClosingPreview } from "../../store/sales/dispatchClosingSlice";
import {
  selectDispatchClosing,
  selectDispatchClosingError,
  selectDispatchClosingLoading,
} from "../../store/sales/dispatchClosingSelectors";
import { DispatchClosingContent } from "./DispatchClosingContent";

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Cierre de Despacho</DialogTitle>
      <DialogContent dividers>
        {loading && <Typography variant="h3">Cargando ...</Typography>}
        {error && <Typography variant="h3">Error {error}</Typography>}
        {closing && <DispatchClosingContent closing={closing} />}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
            !closing ||
            closing.pendingMovements.length > 0 ||
            closing.existingClosing.length > 0
          }
        >
          Cerrar despacho
        </Button>
      </DialogActions>
    </Dialog>
  );
};
