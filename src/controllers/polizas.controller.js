import {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
} from "../functions/polizas.functions.js";

export const getAll = async (req, res) => {
  try {
    const polizas = await obtenerTodas();
    res.json(polizas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pólizas" });
  }
};

export const getById = async (req, res) => {
  const poliza = await obtenerPorId(req.params.id_poliza);
  if (!poliza) return res.status(404).json({ error: "Póliza no encontrada" });
  res.json(poliza);
};

export const getStats = async (req, res) => {
  try {
    const polizas = await obtenerTodas();

    const { transmision, comb_electrico, siniestro } = req.query;

    let filtradas = polizas.filter((p) => {
      return (
        (!transmision || p.transmision === transmision) &&
        (!comb_electrico || p.comb_electrico === comb_electrico) &&
        (siniestro === undefined || String(p.siniestro) === siniestro)
      );
    });

    if (filtradas.length === 0) return res.json({ total: 0 });

    const conSiniestro = filtradas.filter(
      (p) => p.siniestro === true || p.siniestro === "true",
    ).length;
    const mediaEdadCoche =
      filtradas.reduce((acc, p) => acc + Number(p.edad_coche), 0) /
      filtradas.length;
    const mediaEdadTomador =
      filtradas.reduce((acc, p) => acc + Number(p.edad_tomador), 0) /
      filtradas.length;

    res.json({
      total: filtradas.length,
      porcentajeSiniestros: ((conSiniestro / filtradas.length) * 100).toFixed(
        2,
      ),
      mediaEdadCoche: mediaEdadCoche.toFixed(2),
      mediaEdadTomador: mediaEdadTomador.toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: "Error al calcular estadísticas" });
  }
};

export const create = async (req, res) => {
  const { error, resultado } = await crear(req.body);
  if (error) return res.status(400).json({ error });
  res.status(201).json(resultado);
};

export const update = async (req, res) => {
  try {
    const { error, resultado } = await actualizar(req.body);

    if (error) return res.status(404).json({ error });

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la póliza" });
  }
};

export const remove = async (req, res) => {
  const { error, resultado } = await eliminar(req.params.id_poliza);
  if (error) return res.status(404).json({ error });
  res.json({ mensaje: resultado });
};
