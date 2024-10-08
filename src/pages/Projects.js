// src/pages/Projects.js
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
import '../sass/projects.css'; // Asegúrate de tener este archivo en la ruta correcta



export default function Projects() {
    // Cambiar el color del navbar
    useEffect(() => {
        
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.backgroundColor = 'rgb(255, 155, 0)';
        }

        // Limpiar el estilo al salir de la página de contacto
        return () => {
           
            if (navbar) {
                navbar.style.backgroundColor = '';
            }
        };
    }, []);
    const projectData = [
        {
            image: ModuloSil,
            title: "Creacíon de modulos de sección",
            description: 'Creación de nuevos modulos y personalización total de temas en shopify',
            techStack: "Shopify, Liquid.js, javaScript, Node.js",
            liveLink: "https://www.silbonshop.com/collections/old-heritage-man"
            
        },
        {
            image: Silbon,
            title: "NEW WEB Silbon",
            description: 'Cambio de Salesforce a Shopify y redefinicion de concepto',
            techStack: "Shopify, Liquid.js, javaScript, Node.js",
            liveLink: "https://www.silbonshop.com/"
            
        },
        {
            image: DataLayer,
            title: "Medición de eventos",
            description: 'Creación de eventos para medición, dataLayer  ',
            techStack: "javaScript",
            liveLink: "https://www.silbonshop.com/"
            
        },
        {
            image: Bar,
            title: "Silbon Bar",
            description: 'Web del Bar Silbon situado en Córdoba y Madrid',
            techStack: "WordPress",
            liveLink: "https://silbonbar.es/"
            
        },
        {
            image: Tripulacion,
            title: "Emancipatic",
            description: 'Trabajo realizado en "The Bridge". Trabajo para Emancipatic ayuda a evaluar la accesibilidad las aplicaciones web de empresas...',
            techStack: "React, Node.js, Sass, MongoDB/MySQL, JWT...",
            githubLink: "https://github.com/JavierPolaris/Heroku",
            liveLink: "https://enigmatic-plateau-00138.herokuapp.com"
        },
        {
            image: Ruting,
            title: "Red Social",
            description: 'Trabajo realizado en "The Bridge". App de red social para ciclistas donde además de trabajar con entradas de texto/img... también muestra la geolocalización de tus contactos.',
            techStack: "React, Node.js, Sass, MongoDB/MySQL, JWT...",
            githubLink: "https://github.com/JavierPolaris/RutinBiker",
            liveLink: "https://enigmatic-plateau-00138.herokuapp.com"
        },
        {
            image: Cuber1,
            title: "Cuber",
            description: 'Trabajo realizado en "The Bridge". Puedes pedir un coche con chofer, te dice el tiempo que tarda en llegar con utilización de mapas y geolocalización.',
            techStack: "Pug, EJS, CSS, Node.js, MongoDB, MySQL",
            githubLink: "https://github.com/JavierPolaris/Rol2.git",
            liveLink: null
        },
        {
            image: Deporte,
            title: "SPA Sport",
            description: 'Trabajo realizado en "The Bridge", App para la compra de dorsales en pruebas deportivas, el cliente puede filtrar por comunidades o por deportes y realizar la inscripción.',
            techStack: "React, Node.js, Sass, Express, Mongoose...",
            githubLink: "https://github.com/JavierPolaris/Rol3.git",
            liveLink: null
        },
        {
            image: Personal,
            title: "Portafolios",
            description: 'Primer portafolio para entender el funcionamiento de los conceptos básicos de la programación.',
            techStack: "HTML, CSS, JavaScript",
            githubLink: "https://github.com/JavierPolaris/Web-Personal.git",
            liveLink: null
        },
        {
            image: Cine1,
            title: "Cines Paradiso",
            description: 'Trabajo realizado en "The Bridge" como parte del Bootcamp de Full Stack Develop. En este caso se trata de una aplicación donde puedes leer info de peliculas, comprar entradas...',
            techStack: "HTML, JavaScript, CSS",
            githubLink: "https://github.com/JavierPolaris/Trabajo-Equipo.git",
            liveLink: null
        }
    ];
    

    return (
        <div className='projects'>
            <Navbar />
            <div className='projects-container'>
                <div className='projects-header'>
                <img src={CajaPiza} alt={CajaPiza} className='CajaPiza' />
                    {/* <h1 className='projects-title'>Projects</h1>
                    <p className='projects-subtitle'>Things I’ve built so far</p> */}
                </div>
                <div className='projects-grid'>
                    {projectData.map((project, index) => (
                        <div className='project-card' key={index}>
                            <img src={project.image} alt={project.title} className='project-image' />
                            <div className='project-content'>
                                <h2 className='project-title'>{project.title}</h2>
                                <p className='project-description'>{project.description}</p>
                                <p className='project-tech'><strong>Tech stack:</strong> {project.techStack}</p>
                                <div className='project-links'>
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className='project-link'>
                                            <img src={GitIcon} alt="GitHub" className='link-icon' />
                                            View Code
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className='project-link'>
                                            <img src={LinkIcon} alt="Live Site" className='link-icon' />
                                            View Live
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
