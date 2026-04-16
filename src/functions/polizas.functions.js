import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../../seguros.json");

async function leerPolizas() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el JSON:", error);
    return [];
  }
}

async function guardarPolizas(polizas) {
  await fs.writeFile(DATA_FILE, JSON.stringify(polizas, null, 2));
}

export async function obtenerTodas() {
  return await leerPolizas();
}

export async function obtenerPorId(id_poliza) {
  const polizas = await leerPolizas();
  return polizas.find((p) => p.id_poliza === id_poliza) || null;
}

export async function crear(nueva) {
  const polizas = await leerPolizas();

  if (polizas.find((p) => p.id_poliza === nueva.id_poliza)) {
    return { error: "Ya existe una póliza con ese ID" };
  }

  polizas.push(nueva);
  await guardarPolizas(polizas);
  return { resultado: nueva };
}

export async function actualizar(actualizada) {
  const polizas = await leerPolizas();
  const index = polizas.findIndex((p) => p.id_poliza === actualizada.id_poliza);

  if (index === -1) return { error: "Póliza no encontrada" };
  const polizaOriginal = polizas[index];

  let polizaFusionada = { ...polizaOriginal, ...actualizada };
  polizaFusionada.id_poliza = polizaOriginal.id_poliza;

  if (polizaOriginal.matricula) {
    polizaFusionada.matricula = polizaOriginal.matricula;
  }
  polizas[index] = polizaFusionada;

  await guardarPolizas(polizas);
  return { resultado: polizas[index] };
}

export async function eliminar(id_poliza) {
  const polizas = await leerPolizas();
  const index = polizas.findIndex((p) => p.id_poliza === id_poliza);

  if (index === -1) return { error: "Póliza no encontrada" };

  polizas.splice(index, 1);
  await guardarPolizas(polizas);
  return { resultado: "Póliza eliminada correctamente" };
}
