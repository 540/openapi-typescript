// Exportar todo desde el archivo de handlers
export * from "./handlers.js";

// Exportar la función de configuración para el navegador
export { setupMSW as setupBrowserMSW } from "./browser.js";
