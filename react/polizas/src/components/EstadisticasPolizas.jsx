import { useState } from "react";

const EstadisticasPolizas = () => {
  const [filtros, setFiltros] = useState({
    transmision: "",
    comb_electrico: "",
    siniestro: "",
  });

  const [estadisticas, setEstadisticas] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const nombreCaja = e.target.name;
    const texto = e.target.value;

    let copiaFiltros = {
      transmision: filtros.transmision,
      comb_electrico: filtros.comb_electrico,
      siniestro: filtros.siniestro,
    };

    copiaFiltros[nombreCaja] = texto;
    setFiltros(copiaFiltros);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEstadisticas(null);

    try {
      const params = new URLSearchParams();
      if (filtros.transmision)
        params.append("transmision", filtros.transmision);
      if (filtros.comb_electrico)
        params.append("comb_electrico", filtros.comb_electrico);
      if (filtros.siniestro !== "")
        params.append("siniestro", filtros.siniestro);

      const respuesta = await fetch(
        `http://localhost:3001/api/polizas/stats?${params.toString()}`,
      );
      const datos = await respuesta.json();
      setEstadisticas(datos);
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h2>Estadísticas</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Transmisión:</label>
          <select
            name="transmision"
            value={filtros.transmision}
            onChange={handleChange}
          >
            <option value="">Todas</option>
            <option value="Manual">Manual</option>
            <option value="Automática">Automática</option>
          </select>
        </div>
        <div>
          <label>Combustible:</label>
          <select
            name="comb_electrico"
            value={filtros.comb_electrico}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value="Combustión">Combustión</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
        </div>
        <div>
          <label>Siniestro:</label>
          <select
            name="siniestro"
            value={filtros.siniestro}
            onChange={handleChange}
          >
            <option value="">Todos</option>
            <option value={0}>No</option>
            <option value={1}>Sí</option>
          </select>
        </div>

        <button type="submit">Ver estadísticas</button>
      </form>

      {estadisticas && (
        <div>
          <h3>Resultados</h3>
          <p>Total de pólizas: {estadisticas.total}</p>
          <p>Con siniestro: {estadisticas.conSiniestro}</p>
          <p>Sin siniestro: {estadisticas.sinSiniestro}</p>
          <p>Porcentaje con siniestro: {estadisticas.porcentajeSiniestro}%</p>
          <p>Media edad del coche: {estadisticas.mediaEdadCoche} años</p>
          <p>Media edad del tomador: {estadisticas.mediaEdadTomador} años</p>
        </div>
      )}
    </div>
  );
};

export default EstadisticasPolizas;
