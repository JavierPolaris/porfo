import React, { useEffect, useState } from 'react';
import Yo from '../assets/img/yoAb.png';
import Lk from '../assets/img/lk.png';
import Be from '../assets/img/be.png';
import Back from '../assets/img/backA.gif';
import '../sass/about.css';

export default function About() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

        function handleKeyUp(e) {
            if (e.keyCode === 32) window.location.href = '/juego';
            if (e.keyCode === 27)  window.location.href = '/';
        }

        document.body.addEventListener('keyup', handleKeyUp);
        return () => document.body.removeEventListener('keyup', handleKeyUp);
    }, []);

    return (
        <div className='about-page' style={{ backgroundImage: `url(${Back})` }}>
            <div className="close-button" onClick={() => window.location.href = '/'}>✕</div>

            <div className='about-inner'>
                {/* Columna izquierda */}
                <aside className='about-sidebar'>
                    <img src={Yo} className='about-photo' alt="Javier García-Rojo Cantón" />

                    <div className='about-identity'>
                        <h1 className='about-name'>Javier<br />G-R Cantón</h1>
                        <p className='about-roles'>
                            Ecommerce Dev · Full Stack<br />
                            Technical Lead · Product Builder
                        </p>
                    </div>

                    <div className='about-links'>
                        <a href="https://www.linkedin.com/in/javierg-rcanton/" target="_blank" rel="noopener noreferrer" className='about-social-btn'>
                            <img src={Lk} alt="LinkedIn" />
                            LinkedIn
                        </a>
                        <a href="https://www.behance.net/javierrojo" target="_blank" rel="noopener noreferrer" className='about-social-btn'>
                            <img src={Be} alt="Behance" />
                            Behance
                        </a>
                    </div>

                    <p className='about-hint'>
                        {!isTouchDevice
                            ? <>· Espacio para jugar · Esc para volver ·</>
                            : <button className="touch-here" onClick={() => window.location.href = '/juego'}>Jugar de nuevo</button>
                        }
                    </p>
                </aside>

                {/* Columna derecha */}
                <div className='about-content'>
                    <p className='about-summary'>
                        En los últimos 4 años he evolucionado desde desarrollador frontend ecommerce en Shopify
                        hasta un perfil técnico multidisciplinar centrado en arquitectura digital, automatización,
                        integraciones y desarrollo full‑stack. Actualmente participo en la definición técnica del
                        ecosistema ecommerce de <strong>Silbon</strong>, liderando proyectos de accesibilidad,
                        analítica, rendimiento, expansión internacional y automatización de procesos —
                        además de desarrollar soluciones SaaS y apps móviles propias.
                    </p>

                    <div className='about-sections'>
                        <section className='about-section'>
                            <h2 className='about-section-title'>En Silbon</h2>
                            <ul className='about-list'>
                                <li>Theme Shopify Plus — Liquid, JS, CSS avanzado</li>
                                <li>Integraciones: Doofinder, Salesmanago, Zendesk, OneTrust, GA4 / GTM / Consent Mode</li>
                                <li>APIs serverless en Vercel y Render · Node.js · NestJS</li>
                                <li>Automatización de reporting, PDFs y Excel</li>
                                <li>Microsoft Fabric / OneLake · PostgreSQL · Prisma</li>
                                <li>Accesibilidad ADA/WCAG para mercado USA</li>
                                <li>SEO técnico · Core Web Vitals · Escalabilidad internacional</li>
                                <li>Auditoría de proveedores · Coordinación de partners y agencias</li>
                            </ul>
                        </section>

                        <section className='about-section'>
                            <h2 className='about-section-title'>Producto propio — SportOS</h2>
                            <ul className='about-list'>
                                <li>Plataforma SaaS multi‑tenant para centros deportivos (origen: escuelas de skate)</li>
                                <li>Backend NestJS · Panel admin React/Vite · App móvil Expo</li>
                                <li>Sistema de vídeos · Notificaciones push (Firebase) · Métricas y reporting</li>
                                <li>Publicación en Apple App Store</li>
                            </ul>
                        </section>

                        <section className='about-section'>
                            <h2 className='about-section-title'>Stack actual</h2>
                            <div className='about-tags'>
                                {['Shopify Plus','React','Vite','NestJS','Node.js','PostgreSQL',
                                  'Prisma','Docker','Expo','TypeScript','GTM / GA4',
                                  'Vercel','Render','Firebase','Liquid'].map(tag => (
                                    <span key={tag} className='about-tag'>{tag}</span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
