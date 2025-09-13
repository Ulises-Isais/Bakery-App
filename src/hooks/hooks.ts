import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

//Para dispatch tipado
export const useAppDispatch: () => AppDispatch = useDispatch;

//Para selector tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
