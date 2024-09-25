import React, { useEffect, useState } from 'react';
import Yo from '../assets/img/yoAb.png';
import Tw from '../assets/img/tw.png';
import Lk from '../assets/img/lk.png';
import Be from '../assets/img/be.png';
import Back from '../assets/img/backA.gif';

export default function About() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        // Detectar si es un dispositivo táctil
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

        function handleKeyUp(e) {
            if (e.keyCode === 32) {
                window.location.href = "/juego";
            }
            if (e.keyCode === 27) {
                window.location.href = "/home";
            }
        }

        // Elimina el event listener de touchstart global
        document.body.addEventListener('keyup', handleKeyUp);

        return () => {
            document.body.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className='about-page'>
            <div className="close-button" onClick={() => window.location.href = "/home"}>
                x {/* El símbolo "X" */}
            </div>
            <h1 className='cabecera'>
                Mi nombre es Javier García-Rojo Cantón
            </h1>

            <div className='contenedorAbo'>
                <div className='yoMis'>
                    <img src={Yo} className='yo' alt="Yo" />
                    <div className='rrss'>
                        <a href="https://www.linkedin.com/in/javierg-rcanton/" target="_blank" rel="noopener noreferrer">
                            <button className='social-button'>
                                <img src={Lk} alt="LinkedIn" />
                            </button>
                        </a>
                        <a href="https://www.behance.net/javierrojo" target="_blank" rel="noopener noreferrer">
                            <button className='social-button'>
                                <img src={Be} alt="Behance" />
                            </button>
                        </a>
                    </div>

                    <h1 className='spaceBar1'>
                        {!isTouchDevice ? (
                            <>
                                Pulsa la tecla "Espacio" para volver a jugar o "Esc" para volver
                            </>
                        ) : (
                            <>
                                Toca <button className="touch-here" onClick={() => window.location.href = "/juego"}>Aquí</button> para volver a jugar
                            </>
                        )}
                    </h1>
                </div>

                <div className='aboutMe'>
                    <p className='parrafo'>

                       
                        Actualmente, soy el desarrollador web full stack en Silbon, una empresa de moda donde llevo casi 2 años. En mi rol, me encargo de tareas que van desde el front-end hasta la implementación de datalyers y la creación de aplicaciones para optimizar diferentes procesos de la compañía.

                        Antes de unirme a Silbon, trabajé como desarrollador front-end en otra empresa, lo que me permitió consolidar mi experiencia en el campo. Mi recorrido en el mundo del desarrollo comenzó al inicio de la pandemia, cuando decidí formarme intensamente en el sector tecnológico. Este impulso me llevó a completar un Bootcamp en "The Bridge", donde me especialicé en Full Stack Development. El curso fue un intensivo de 4 meses en el que practiqué las tecnologías más demandadas en el mercado laboral.

                        Cada día me siento más preparado, sigo formándome desde mi puesto de trabajo, y me apasionan los retos que se presentan.
                    </p>
                </div>
            </div>
        </div>
    );
}
