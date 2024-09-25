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

        function handleTouchStart() {
            window.location.href = "/juego";
        }

        document.body.addEventListener('keyup', handleKeyUp);

        if (isTouchDevice) {
            document.body.addEventListener('touchstart', handleTouchStart);
        }

        return () => {
            document.body.removeEventListener('keyup', handleKeyUp);

            if (isTouchDevice) {
                document.body.removeEventListener('touchstart', handleTouchStart);
            }
        };
    }, [isTouchDevice]);

    return (



        <div className='about-page'>

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
                                Toca la pantalla para volver a jugar o "Esc" para volver
                            </>
                        )}
                    </h1>
                </div>

                <div className='aboutMe'>

                    <p className='parrafo'>
                        Desde hace años llevo formándome en el mundo audiovisual y de diseño, me apasiona llevar mis ideas a otro nivel, tanto es así que llevo dos años formándome como desarrollador FULLSTACK DEVELOPER mezclando mis dos pasiones: el diseño y las aplicaciones web.
                        Actualmente he terminado un Bootcamp en "The Bridge". El BootCamp de Full Stack Developer es un curso/master intensivo de 4 meses donde se está continuamente practicando con las tecnologías que se utilizan en las empresas, y está orientado a la empleabilidad, haciendo de vehículo conductor de lo aprendido con los futuros trabajos.
                    </p>

                </div>
            </div>

        </div>

    );
}
