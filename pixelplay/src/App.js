import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Comun from './Componentes/Comun/Comun';
import Main from './Componentes/Main/Main';
import Paginadetalle from './Componentes/Pagina_Detalle/Paginadetalle';
import { useParams } from 'react-router-dom';
import Iniciosesion from './Componentes/Iniciosesion/Iniciosesion';
import Registro from './Componentes/Registro/Registro';
import Favoritos from './Componentes/Favoritos/Favoritos';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Comun/>}>
            <Route path="/" element={<Main/>}></Route>
            {/* Utiliza el hook useParams para obtener el gameId de la URL */}
            <Route path="games/:gameId" element={<PaginadetalleWrapper />} />
            <Route path="iniciosesion" element={<Iniciosesion />} />
            <Route path="registro" element={<Registro />} />
            <Route path="favoritos" element={<Favoritos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Componente wrapper para pasar la prop gameId a Paginadetalle
function PaginadetalleWrapper() {
  // Obtiene el gameId de la URL utilizando el hook useParams
  let { gameId } = useParams();
  // Renderiza el componente Paginadetalle con la prop gameId
  return <Paginadetalle gameId={gameId} />;
}

export default App;