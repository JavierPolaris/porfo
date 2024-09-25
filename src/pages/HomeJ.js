import React, { useEffect, useState } from 'react';
import FJuego from '../assets/img/FJuego.png';
import Play from '../assets/img/play.png';
import Stop from '../assets/img/stop.png';
import Musica from '../assets/music/musica.mp3';

export default function HomeJ() {
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        // Detectar si es un dispositivo táctil
        const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(touchDevice);

        // Manejar cambios de orientación
        function handleOrientationChange() {
            const portrait = window.matchMedia("(orientation: portrait)").matches;
            setIsPortrait(portrait);
        }

        handleOrientationChange(); // Establecer el estado inicial

        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);

        // Control de música
        document.querySelector(".stop").addEventListener("click", callar);
        document.querySelector(".play").addEventListener("click", sonar);

        function sonar() {
            var sonido = document.createElement("iframe");
            sonido.setAttribute("src", Musica);
            document.body.appendChild(sonido);
            document.querySelector(".play").removeEventListener("click", sonar);
        }

        function callar() {
            var iframe = document.getElementsByTagName("iframe");

            if (iframe.length > 0) {
                iframe[0].parentNode.removeChild(iframe[0]);
                document.querySelector(".play").addEventListener("click", sonar);
            }
        }

        function handleKeyUp(e) {
            if (e.keyCode === 32) { // Tecla espacio
                window.location.href = "/juego";
            }
        }

        function handleTouchStart(e) {
            e.preventDefault(); // Prevenir comportamiento por defecto
            window.location.href = "/juego";
        }

        // Agregar eventos según el tipo de dispositivo
        if (!isTouchDevice) {
            document.body.addEventListener('keyup', handleKeyUp);
        } else {
            document.body.addEventListener('touchstart', handleTouchStart, { passive: false });
        }

        return () => {
            // Remover eventos al desmontar
            if (!isTouchDevice) {
                document.body.removeEventListener('keyup', handleKeyUp);
            } else {
                document.body.removeEventListener('touchstart', handleTouchStart);
            }
            window.removeEventListener('orientationchange', handleOrientationChange);
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, [isTouchDevice]);

    return (
        <div className='center'>
            {/* Superposición para modo vertical en dispositivos táctiles */}
            {isPortrait && isTouchDevice && (
                <div className="portrait-overlay">
                    <p>Por favor, gira tu dispositivo a modo horizontal para continuar.</p>
                </div>
            )}

            <div className='inicio'>
                <img src={FJuego} className='Fondo' alt="Fondo del juego" />
                {!isTouchDevice ? (
                    <h1 className='spaceBar'>Pulsa la tecla "espacio" para continuar</h1>
                ) : (
                    <h1 className='spaceBar'>Toca la pantalla para continuar</h1>
                )}

                <div id="despertador">
                    <h2 className='soniquete'>Music</h2>
                    <button className="play">
                        <img src={Play} className='play1' alt="Play" />
                    </button>
                    <button className="stop">
                        <img src={Stop} className='stop1' alt="Stop" />
                    </button>
                </div>
            </div>
        </div>
    );
}
