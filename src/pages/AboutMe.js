import React, { useEffect } from 'react';
import Yo from '../assets/img/yoAb.png'
import Yo1 from '../assets/img/yoAb1.png'
import Tw from '../assets/img/tw.png'
import Lk from '../assets/img/lk.png'
import Be from '../assets/img/be.png'
import Back from '../assets/img/backA.gif'






export default function About() {

    useEffect(() => {
        document.body.onkeyup = function(e){
            if(e.keyCode == 32){
                window.location.href = "/juego";
            }
            if(e.keyCode == 27){
                window.location.href = "/home ";
            }
            
        }


    })



    return (
        <div className='center'>
            <img src={Back} className='backAb'/>
            <div className='contenedorAbo'>
                <img src={Yo} className='yo' />
                <div className='rrss'>
                    <button className='twiter'>
                        <img src={Tw} className='tw'/>
                    </button>
                    <button className='twiter'>
                        <img src={Lk} className='tw'/>
                    </button>
                    <button className='twiter'>
                        <img src={Be} className='tw'/>
                    </button>
                </div>
               
                <div className='aboutMe'>
                    <h1 className='cabecera'>
                        Mi nombre es Javier García-Rojo Cantón
                    </h1>
                    <h1 className='cabecera1'>
                        Mi nombre es Javier García-Rojo Cantón
                    </h1>
                    <p className='parrafo'>
                        Desde hace años llevo formandome en el mundo audiovisual y de diseño, me apasiona llevar mis ideas a otro nivel, 
                        tanto es asi que llevo dos años formandome como desarrollador FULLSTACKDEVELOPER mezclando mis dos pasiones el diseño y las aplicaciones WEB.
                        Actualmente he terminado un Bootcamp en "The Bridge". El BootCamp de Full Stack Developer es un curso/master intensivo de 4 meses donde se está continuamente practicando con las tecnologías que se utilizan en las empresas, y está orientada a la empleabilidad, haciendo de vehículo conductor de lo aprendido con los futuros trabajos.
                    </p>
                </div>
               
            </div>
            <h1 className='spaceBar1' style={{
                width: '711px',
                position:'absolute',
                
                textAlign:'center',
                lineHeight:'25px'
            }}>Pulsa la tecla "Espacio" para volver a juagar<br></br>o "Esc para volver"</h1>


        </div>

    )
}
