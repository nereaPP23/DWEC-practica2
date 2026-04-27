import { useState } from "react";
import { useValidation } from "../context/ValidationContext";

const FormularioPolizas = () => {
  const { idPoliza, matricula } = useValidation();

  const [formData, setFormData] = useState({
    id_poliza: "",
    vigencia: "",
    matricula: "",
    edad_coche: "",
    edad_tomador: "",
    cilindrada: "",
    cilindros: "",
    transmision: "Manual",
    comb_electrico: "Combustión",
    peso: "",
    siniestro: 0,
  });

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    //target.name es el nombre de la caja de texto
    //target.value es el valor del texto
    const nombreCaja = e.target.name;
    const texto = e.target.value;

    let copiaDatos = {
      id_poliza: formData.id_poliza,
      vigencia: formData.vigencia,
      matricula: formData.matricula,
      edad_coche: formData.edad_coche,
      edad_tomador: formData.edad_tomador,
      cilindrada: formData.cilindrada,
      cilindros: formData.cilindros,
      transmision: formData.transmision,
      comb_electrico: formData.comb_electrico,
      peso: formData.peso,
      siniestro: formData.siniestro,
    };

    copiaDatos[nombreCaja] = texto;
    setFormData(copiaDatos);
  };

  const validar = () => {
    if (!idPoliza.test(formData.id_poliza)) {
      return "El ID de póliza debe tener el formato IDXXXXX (ej: ID00001)";
    }
    if (!matricula.test(formData.matricula)) {
      return "La matrícula debe tener el formato 4 números y 3 letras válidas (ej: 1234BCD)";
    }
    if (
      formData.vigencia === "" ||
      formData.vigencia < 1 ||
      formData.vigencia > 21
    ) {
      return "La vigencia debe estar entre 1 y 21 meses";
    }
    if (
      formData.edad_coche === "" ||
      formData.edad_coche < 0 ||
      formData.edad_coche > 10
    ) {
      return "La edad del coche debe estar entre 0 y 10";
    }

    const hoy = new Date();
    const edad = parseInt(formData.edad_tomador);
    if (edad < 18 || edad > 90) {
      return "El tomador debe tener entre 18 y 90 años";
    }

    const campos = [
      "id_poliza",
      "vigencia",
      "matricula",
      "edad_coche",
      "edad_tomador",
      "cilindrada",
      "cilindros",
      "peso",
    ];
    for (let campo of campos) {
      if (formData[campo] === "") return "Todos los campos son obligatorios";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    const mensajeError = validar();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    try {
      const respuesta = await fetch("http://localhost:3001/api/polizas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_poliza: formData.id_poliza,
          vigencia: parseInt(formData.vigencia),
          matricula: formData.matricula,
          edad_coche: parseInt(formData.edad_coche),
          edad_tomador: parseInt(formData.edad_tomador),
          cilindrada: parseInt(formData.cilindrada),
          cilindros: parseInt(formData.cilindros),
          transmision: formData.transmision,
          comb_electrico: formData.comb_electrico,
          peso: parseInt(formData.peso),
          siniestro: parseInt(formData.siniestro),
        }),
      });

      const datos = await respuesta.json();

      if (datos.error) {
        setError(datos.error);
        return;
      }

      setExito("Póliza creada correctamente");
      setFormData({
        id_poliza: "",
        vigencia: "",
        matricula: "",
        edad_coche: "",
        edad_tomador: "",
        cilindrada: "",
        cilindros: "",
        transmision: "Manual",
        comb_electrico: "Combustión",
        peso: "",
        siniestro: 0,
      });
    } catch (error) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div>
      <h2>Nueva Póliza</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {exito && <p style={{ color: "green" }}>{exito}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Póliza:</label>
          <input
            type="text"
            name="id_poliza"
            value={formData.id_poliza}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Vigencia (meses):</label>
          <input
            type="number"
            name="vigencia"
            value={formData.vigencia}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Matrícula:</label>
          <input
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Edad del coche:</label>
          <input
            type="number"
            name="edad_coche"
            value={formData.edad_coche}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Edad del tomador:</label>
          <input
            type="number"
            name="edad_tomador"
            value={formData.edad_tomador}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cilindrada:</label>
          <input
            type="number"
            name="cilindrada"
            value={formData.cilindrada}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cilindros:</label>
          <input
            type="number"
            name="cilindros"
            value={formData.cilindros}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Transmisión:</label>
          <select
            name="transmision"
            value={formData.transmision}
            onChange={handleChange}
          >
            <option value="Manual">Manual</option>
            <option value="Automática">Automática</option>
          </select>
        </div>
        <div>
          <label>Combustible:</label>
          <select
            name="comb_electrico"
            value={formData.comb_electrico}
            onChange={handleChange}
          >
            <option value="Combustión">Combustión</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
        </div>
        <div>
          <label>Peso (kg):</label>
          <input
            type="number"
            name="peso"
            value={formData.peso}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Siniestro:</label>
          <select
            name="siniestro"
            value={formData.siniestro}
            onChange={handleChange}
          >
            <option value={0}>No</option>
            <option value={1}>Sí</option>
          </select>
        </div>

        <button type="submit">Crear Póliza</button>
      </form>
    </div>
  );
};

export default FormularioPolizas;
