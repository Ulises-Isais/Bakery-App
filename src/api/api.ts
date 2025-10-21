import axios, { type InternalAxiosRequestConfig } from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const appApi = axios.create({
  baseURL: VITE_API_URL,
});

// Interceptor para agregar el token a todas las peticiones
appApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("x-token");

  // Axios garantiza que headers existe y es tipo AxiosHeaders, así que no reasignamos
  if (token) {
    // Si headers tiene el método set() (AxiosHeaders)
    if (typeof config.headers.set === "function") {
      config.headers.set("x-token", token);
    } else {
      // fallback muy raro (por si headers es un objeto plano en alguna versión antigua)
      (config.headers as Record<string, string>)["x-token"] = token;
    }
  }

  return config;
});

export default appApi;
