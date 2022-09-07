import React, { useEffect } from 'react';
import FJuego from '../assets/img/FJuego.png';
import Play from '../assets/img/play.png';
import Stop from '../assets/img/stop.png';
import Musica from '../assets/music/musica.mp3';






export default function Home() {

    useEffect(() => {

        document.querySelector(".stop").addEventListener("click", callar);
        document.querySelector(".play").addEventListener("click", sonar);


        function sonar() {
            var sonido = document.createElement("iframe");
            sonido.setAttribute("src", Musica);
            document.body.appendChild(sonido);
            document.querySelector("play").removeEventListener("click", sonar);
        }

        function callar() {
           
            var iframe = document.getElementsByTagName("iframe");

            if (iframe.length > 0) {
                iframe[0].parentNode.removeChild(iframe[0]);
                document.querySelector("play").addEventListener("click", sonar);
            }
        }
        document.body.onkeyup = function(e){
            if(e.keyCode == 32){
                window.location.href = "/juego";
            }
        }

    })



    return (
        <div className='center'>

            <img src={FJuego} className='Fondo' />
            <h1 className='spaceBar'>Pulsa la tecla "espacio" para continuar</h1>

            <div id="despertador" >
                <h2 className='soniquete'>Music</h2>
                <button className="play">
                    <img src={Play} className='play1'/>
                    </button>
                <button className="stop">
                <img src={Stop} className='stop1'/>
                </button>
                {/* <iframe src={Musica} className='sonido' autoplay>
                </iframe> */}


            </div>


        </div>

    )
}
