import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { client } from "../generated/client/client.gen.js";
import { setupBrowserMSW } from "./msw/index.js";

// Inicializar MSW si está habilitado
const initApp = async () => {
  // Configurar MSW (solo se activará si VITE_ENABLE_MSW=true)
  await setupBrowserMSW();

  // Configurar el cliente API
  client.setConfig({
    baseUrl: "http://localhost:3000",
  });

  const queryClient = new QueryClient();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
};

// Iniciar la aplicación
initApp().catch(console.error);
