import logo from './logo.svg';
import './App.css';
import {  BrowserRouter, Routes, Route } from "react-router-dom";
import Comun from './Componentes/Comun/Comun';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
       <Route path="/" element={<Comun/>}>
          
       </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
