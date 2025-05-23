import { createOpenApiHttp } from "./index.js";

const http = createOpenApiHttp();

http.get("/pets", ({ response }) => {
  return response(200).json([{ id: 1, name: "dog" }]);
});

http.get("/pets/{petId}", ({ response }) => {
  return response(200).json({ id: 1, name: "dog" });
});
