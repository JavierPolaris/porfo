// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LogoJavi from '../assets/img/logoJavi.png';
import Cabecera from './Cabecera';
import '../sass/Navbar.css'; // Asegúrate de crear este archivo para los estilos

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Cerrar el menú al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !event.target.closest('.hamburger')
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='navbar'>
            <Link to="/" className='navbar-left'>

                <img src={LogoJavi} className='logo' alt="Logo Javi" />
                <h1 className='textLo'>POLARIS</h1>

            </Link>
            <div className='navbar-right'>
                <button
                    className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={isMenuOpen}
                >
                    <span className='hamburger-line'></span>
                    <span className='hamburger-line'></span>
                    <span className='hamburger-line'></span>
                </button>
            </div>

            {/* Menú Desplegable */}
            <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
                <Cabecera closeMenu={closeMenu} />
            </div>
        </nav>
    );
}

export default Navbar;
