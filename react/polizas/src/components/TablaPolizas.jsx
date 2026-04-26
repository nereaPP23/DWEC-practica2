import { useState, useEffect } from "react";

const TablaPolizas = () => {
  const [polizas, setPolizas] = useState([]);

  useEffect(() => {
    const cargarPolizas = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/api/polizas");
        const datos = await respuesta.json();
        setPolizas(datos);
      } catch (error) {
        console.error("Error al cargar las pólizas:", error);
      }
    };
    cargarPolizas();
  }, []);

  const eliminarPoliza = async (id_poliza) => {
    if (!confirm(`¿Seguro que quieres eliminar la póliza ${id_poliza}?`))
      return;

    try {
      const respuesta = await fetch(
        `http://localhost:3001/api/polizas/${id_poliza}`,
        {
          method: "DELETE",
        },
      );
      const datos = await respuesta.json();
      console.log(datos.mensaje);
      // Actualiza la tabla quitando la póliza eliminada
      setPolizas(polizas.filter((p) => p.id_poliza !== id_poliza));
    } catch (error) {
      console.error("Error al eliminar la póliza:", error);
    }
  };

  return (
    <div>
      <h2>Listado de Pólizas</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>ID Póliza</th>
            <th>Vigencia (meses)</th>
            <th>Matrícula</th>
            <th>Edad coche</th>
            <th>Edad tomador</th>
            <th>Cilindrada (cc)</th>
            <th>Cilindros</th>
            <th>Transmisión</th>
            <th>Combustible</th>
            <th>Peso (kg)</th>
            <th>Siniestro</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {polizas.map((poliza) => (
            <tr key={poliza.id_poliza}>
              <td>{poliza.id_poliza}</td>
              <td>{poliza.vigencia}</td>
              <td>{poliza.matricula}</td>
              <td>{poliza.edad_coche}</td>
              <td>{poliza.edad_tomador}</td>
              <td>{poliza.cilindrada}</td>
              <td>{poliza.cilindros}</td>
              <td>{poliza.transmision}</td>
              <td>{poliza.comb_electrico}</td>
              <td>{poliza.peso}</td>
              <td>{poliza.siniestro === 1 ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => eliminarPoliza(poliza.id_poliza)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPolizas;
