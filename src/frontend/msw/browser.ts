import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.js";

// Configurar el worker de MSW para el navegador
export const worker = setupWorker(...handlers);

// Función para inicializar MSW en el navegador
export const setupMSW = async () => {
  // Verificar si MSW debe estar habilitado
  const isMswEnabled = import.meta.env.VITE_ENABLE_MSW === "true";

  if (isMswEnabled) {
    // Iniciar el worker con un log personalizado
    await worker.start({
      onUnhandledRequest: "bypass", // No mostrar advertencias para peticiones no manejadas
    });

    console.log("%c[MSW] Mock Service Worker activado", "color: #0f0; font-weight: bold;");
  }
};
