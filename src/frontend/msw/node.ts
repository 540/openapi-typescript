import { setupServer } from "msw/node";
import { handlers } from "./handlers.js";

// Configurar el servidor de MSW para Node.js (útil para tests)
export const server = setupServer(...handlers);

// Función para inicializar MSW en Node.js
export const setupMSW = () => {
  // Verificar si MSW debe estar habilitado
  const isMswEnabled = process.env.ENABLE_MSW === "true";

  if (isMswEnabled) {
    // Iniciar el servidor
    server.listen({ onUnhandledRequest: "bypass" });
    console.log("[MSW] Mock Service Worker activado en Node.js");
    
    // Limpiar después de todos los tests
    return () => {
      server.close();
    };
  }
  
  // Si MSW no está habilitado, devolver una función vacía
  return () => {};
};
