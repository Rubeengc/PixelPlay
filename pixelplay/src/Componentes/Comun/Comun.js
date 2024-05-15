import Cabecera from '../Cabecera/Cabecera';

 import { Outlet } from 'react-router-dom';
function Comun() {

  return (
    <div className="Comun">
     
   
      <Cabecera/>
   
        <Outlet />
   
      <Piedepagina/>
      
    </div>
  );
}

export default Comun;