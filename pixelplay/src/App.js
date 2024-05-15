import logo from './logo.svg';
import './App.css';
import {  BrowserRouter, Routes, Route } from "react-router-dom";

import Cabecera from './Componentes/Cabecera/Cabecera';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
       <Route path="/" element={<Cabecera/>}>
          
       </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
