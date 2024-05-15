import React from "react";
import './Cabecera.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./pixelplay.png";
import iniciosesion from "./person_24dp_FILL1_wght400_GRAD200_opsz24.png";
import favoritos from "./grade_24dp_FILL1_wght400_GRAD200_opsz24.png";

const Cabecera = () => {  
return <>
 
 <div className="cabecera">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <div className="iconos">
                <Link to="/favoritos">
                    <img src={favoritos} alt="favoritos" />
                </Link>
                <Link to="/iniciosesion">
                    <img src={iniciosesion} alt="Inicio Sesión" />
                </Link>
            </div>
        </div>

</>


}
export default Cabecera;