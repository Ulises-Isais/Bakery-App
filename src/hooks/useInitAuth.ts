import { useAppDispatch } from "../hooks/hooks";
import { useEffect } from "react";
import { initializeAuth } from "../store/auth/authSlice";
import appApi from "../api/api";

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(initializeAuth(null));
        return;
      }

      try {
        const { data } = await appApi.get("/auth/me");
        dispatch(initializeAuth({ token, user: data.user }));
      } catch {
        localStorage.removeItem("token");
        dispatch(initializeAuth(null));
      }
    };

    initAuth();
  }, [dispatch]);
};
