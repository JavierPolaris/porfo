// src/components/Cabecera.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../sass/Cabecera.css'; // Crea un archivo específico para Cabecera

const Cabecera = ({ closeMenu }) => {
    return (
        <nav className="cabecera-nav">
            <ul className="cabecera-ul">
                <li className="menu">
                    <Link to="/homeJuego" className="cabecera-a" onClick={closeMenu}>
                        ABOUT
                    </Link>
                </li>
                <li className="menu">
                    <Link to="/projects" className="cabecera-a" onClick={closeMenu}>
                        PROJECT
                    </Link>
                </li>
                <li className="menu">
                    <Link to="/contact" className="cabecera-a" onClick={closeMenu}>
                        CONTACT
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Cabecera;
