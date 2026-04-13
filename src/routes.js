import { glob } from "glob";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadRoutes = async () => {
  const pattern = path
    .join(__dirname, "routes/*.routes.js")
    .replaceAll("\\", "/");
  const files = glob.sync(pattern);
  return Promise.all(files.map((file) => import(file)));
};
