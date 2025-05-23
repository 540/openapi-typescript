import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { client } from "./client/client.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
