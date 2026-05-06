import React from 'react';
import { Link } from 'react-router-dom';
import '../sass/Cabecera.css';

const Cabecera = ({ closeMenu }) => {
    return (
        <nav className="cabecera-nav">
            <ul className="cabecera-ul">
                <li className="menu">
                    <Link to="/about" className="cabecera-a" onClick={closeMenu}>
                        SOBRE MÍ
                    </Link>
                </li>
                <li className="menu">
                    <Link to="/projects" className="cabecera-a" onClick={closeMenu}>
                        PROYECTOS
                    </Link>
                </li>
                <li className="menu">
                    <Link to="/contact" className="cabecera-a" onClick={closeMenu}>
                        CONTACTO
                    </Link>
                </li>
                <li className="menu">
                    <Link to="/homeJuego" className="cabecera-a cabecera-a--game" onClick={closeMenu}>
                        🎮 JUEGO
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Cabecera;
