import React from 'react';
import { Link } from 'react-router-dom';
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

      <main className='main-content'>
        <div className='hero'>
          <p className='hero-greeting'>Hola, soy</p>
          <h1 className='hero-name'>Javier G-R Cantón</h1>
          <p className='hero-title'>Full Stack Developer</p>
          <p className='hero-sub'>
            Desarrollo aplicaciones web de principio a fin.<br />
            Actualmente en <strong>Silbon</strong>, donde llevo casi 2 años.
          </p>
          <div className='hero-cta'>
            <Link to="/projects" className='btn-primary'>Ver proyectos</Link>
            <Link to="/contact" className='btn-secondary'>Contactar</Link>
          </div>
        </div>
      </main>

      <footer className='footer'>
        <div className='footer__left' />
        <div className='footer__right'>
          <a className='social' href='https://twitter.com/JavierPolaris' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Twiter} alt="Twitter" />
          </a>
          <a className='social' href='https://github.com/JavierPolaris' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Git} alt="GitHub" />
          </a>
          <a className='social' href='https://www.linkedin.com/in/javierg-rcanton/' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Linkedin} alt="LinkedIn" />
          </a>
          <a className='social' href='https://www.behance.net/javierrojo' target="_blank" rel="noopener noreferrer">
            <img className='imgH' src={Be} alt="Behance" />
          </a>
        </div>
      </footer>
    </div>
  );
}
