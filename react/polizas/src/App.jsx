import { Routes, Route, Link } from "react-router-dom";
import TablaPolizas from "./components/TablaPolizas";
import FormularioPolizas from "./components/FormularioPolizas";
import EditarPolizas from "./components/EditarPolizas";
import EstadisticasPolizas from "./components/EstadisticasPolizas";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/">Ver Pólizas</Link>
        <Link to="/nueva">Nueva Póliza</Link>
        <Link to="/editar">Editar Póliza</Link>
        <Link to="/estadisticas">Estadísticas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TablaPolizas />} />
        <Route path="/nueva" element={<FormularioPolizas />} />
        <Route path="/editar" element={<EditarPolizas />} />
        <Route path="/estadisticas" element={<EstadisticasPolizas />} />
      </Routes>
    </>
  );
};

export default App;
