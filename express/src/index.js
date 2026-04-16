import http from "http";
import app, { initializeRoutes } from "./server.js";

const port = process.env.APP_PORT || 3001;
const server = http.createServer(app);

initializeRoutes()
  .then(() => {
    server.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error al inicializar:", err);
    process.exit(1);
  });
