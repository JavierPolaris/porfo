// src/pages/Home.jsx
import React from 'react';
import Twiter from '../assets/img/twiter.png';
import Git from '../assets/img/githab.png';
import Linkedin from '../assets/img/linkedin.png';
import Be from '../assets/img/beance.png';
import '../sass/Home.css';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className='home'>
      <Navbar />
      {/* Espacio Vacío para empujar el footer hacia abajo */}
      <div className='main-content'>
        {/* Puedes agregar contenido principal aquí si lo deseas */}
      </div>

      {/* Footer */}
      <footer className='footer'>
        <div className='footer__left'>
    
        </div>
        <div className='footer__right'>
          <a className='social' href='https://twitter.com/JavierPolaris' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Twiter} alt="Twitter"/>
          </a>
          <a className='social' href='https://github.com/JavierPolaris' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Git} alt="GitHub"/>
          </a>
          <a className='social' href='https://www.linkedin.com/in/javierg-rcanton/' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Linkedin} alt="LinkedIn"/>
          </a>
          <a className='social' href='https://www.behance.net/javierrojo' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Be} alt="Behance"/>
          </a>
        </div>
      </footer>
    </div>
  );
}
