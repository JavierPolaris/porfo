import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Cine1 from '../assets/img/porjects/cine1.png';
import Cuber1 from '../assets/img/porjects/cuber1.png';
import Deporte from '../assets/img/porjects/deportiva1.png';
import Personal from '../assets/img/porjects/personal2.png';
import Ruting from '../assets/img/porjects/ruting4.png';
import Tripulacion from '../assets/img/porjects/tripulaciones.png';
import Bar from '../assets/img/porjects/bar.png';
import Silbon from '../assets/img/porjects/Silbon.png';
import DataLayer from '../assets/img/porjects/dataLayer.png';
import ModuloSil from '../assets/img/porjects/modulo.png';
import GitIcon from '../assets/img/githab.png';
import LinkIcon from '../assets/img/Group.png';
import CajaPiza from '../assets/img/cajaPiza.webp';
import '../sass/projects.css';

export default function Projects() {
    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.backgroundColor = 'rgb(255, 155, 0)';
        return () => {
            if (navbar) navbar.style.backgroundColor = '';
        };
    }, []);

    const projectData = [
        {
            image: ModuloSil,
            title: "Creación de módulos de sección",
            description: 'Creación de nuevos módulos y personalización total de temas en Shopify.',
            techStack: "Shopify, Liquid.js, JavaScript, Node.js",
            liveLink: "https://www.silbonshop.com/collections/old-heritage-man",
        },
        {
            image: Silbon,
            title: "Nueva web Silbon",
            description: 'Migración de Salesforce a Shopify y redefinición del concepto web.',
            techStack: "Shopify, Liquid.js, JavaScript, Node.js",
            liveLink: "https://www.silbonshop.com/",
        },
        {
            image: DataLayer,
            title: "Medición de eventos",
            description: 'Implementación de eventos para medición de analítica web con dataLayer y GTM.',
            techStack: "JavaScript, Google Tag Manager",
            liveLink: "https://www.silbonshop.com/",
        },
        {
            image: Bar,
            title: "Silbon Bar",
            description: 'Web del Bar Silbon situado en Córdoba y Madrid.',
            techStack: "WordPress",
            liveLink: "https://silbonbar.es/",
        },
        {
            image: Tripulacion,
            title: "Emancipatic",
            description: 'Herramienta para evaluar la accesibilidad de aplicaciones web en empresas. Proyecto de "The Bridge".',
            techStack: "React, Node.js, Sass, MongoDB, JWT",
            githubLink: "https://github.com/JavierPolaris/Heroku",
        },
        {
            image: Ruting,
            title: "Red Social Ciclista",
            description: 'App de red social para ciclistas con entradas de texto e imagen, y geolocalización de contactos. Proyecto de "The Bridge".',
            techStack: "React, Node.js, Sass, MongoDB, JWT",
            githubLink: "https://github.com/JavierPolaris/RutinBiker",
        },
        {
            image: Cuber1,
            title: "Cuber",
            description: 'Servicio de coche con chofer con tiempo de llegada en tiempo real usando mapas y geolocalización. Proyecto de "The Bridge".',
            techStack: "Pug, EJS, CSS, Node.js, MongoDB, MySQL",
            githubLink: "https://github.com/JavierPolaris/Rol2.git",
        },
        {
            image: Deporte,
            title: "SPA Sport",
            description: 'App para compra de dorsales en pruebas deportivas, con filtros por comunidad o deporte. Proyecto de "The Bridge".',
            techStack: "React, Node.js, Sass, Express, Mongoose",
            githubLink: "https://github.com/JavierPolaris/Rol3.git",
        },
        {
            image: Personal,
            title: "Primer portfolio",
            description: 'Portfolio personal para afianzar los conceptos básicos del desarrollo web.',
            techStack: "HTML, CSS, JavaScript",
            githubLink: "https://github.com/JavierPolaris/Web-Personal.git",
        },
        {
            image: Cine1,
            title: "Cines Paradiso",
            description: 'Aplicación donde puedes consultar información de películas y comprar entradas. Proyecto de "The Bridge".',
            techStack: "HTML, JavaScript, CSS",
            githubLink: "https://github.com/JavierPolaris/Trabajo-Equipo.git",
        },
    ];

    return (
        <div className='projects'>
            <Navbar />
            <div className='projects-container'>
                <div className='projects-header'>
                    <img src={CajaPiza} alt="Logo de proyectos" className='CajaPiza' />
                </div>
                <div className='projects-grid'>
                    {projectData.map((project, index) => (
                        <div className='project-card' key={index}>
                            <img src={project.image} alt={project.title} className='project-image' loading="lazy" />
                            <div className='project-content'>
                                <h2 className='project-title'>{project.title}</h2>
                                <p className='project-description'>{project.description}</p>
                                <p className='project-tech'><strong>Tech stack:</strong> {project.techStack}</p>
                                <div className='project-links'>
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className='project-link'>
                                            <img src={GitIcon} alt="GitHub" className='link-icon' />
                                            Ver código
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className='project-link'>
                                            <img src={LinkIcon} alt="Sitio en vivo" className='link-icon' />
                                            Ver en vivo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
