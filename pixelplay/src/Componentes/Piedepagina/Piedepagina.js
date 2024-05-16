import React from "react";
import './Piedepagina.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import instagram from "./Instagram.png"
const Piedepagina = () => {  
    return <>
     
     <div className="footer">
                <div className="socialmedia">
                    <Link to="/">
                        <img src={instagram} alt="instagram" />
                    </Link>
                </div>
                <div className="text">
                   <b>Designed by Rubén Garcia</b>
                </div>
            </div>
    
    </>
    
    
    }
    export default Piedepagina;