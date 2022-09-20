import React, { useEffect } from 'react';

import Cabecera from '../components/Cabecera'
import Rectangulo from '../assets/img/rectangulo.png'
import Cine1 from '../assets/img/porjects/cine1.png'
import Cuber1 from '../assets/img/porjects/cuber1.png'
import Deporte from '../assets/img/porjects/deportiva1.png'
import Personal from '../assets/img/porjects/personal2.png'
import Ruting from '../assets/img/porjects/ruting4.png'
import Tripulacion from '../assets/img/porjects/tripulaciones.png'
import LogoJavi from '../assets/img/logoJavi.png'
import Git from '../assets/img/githab.png'
import Link from '../assets/img/Group.png'







export default function Home() {









    return (
        <div className='projects'>
            <Cabecera />
            <a className='social1' href='/home'><img className='imgH1' src={LogoJavi}/></a>
            <div className='contenedorPro'>
                <div className='projectsTex'>
                    <h1 className='proj1'>Projects</h1>
                    <p className='proj2'>Things I’ve built so far</p>
                </div>
                <div className='targetasP'>
                    <div className='contRect'>
                        <div className='contRect1'>
                            <img src={Cine1} className='proCard' />

                            <div className='proCardText'>
                                <h1 className='proCardTextH'>
                                    Cines Paradiso
                                </h1>
                                <p className='proCardTexP'>
                                    Trabajo realizado en "The Bridge" como parte del Bootcamp de Full Stack Develop.En este caso se trata de una aplicación donde puedes leer info de peliculas, comprar entradas...
                                </p>
                                <p className='proCardTexT'>
                                    <b>Tech stack:</b> HTML,JavaScript,CSS
                                </p>
                                <div className='proCardW'>
                                    <img className='proCardG' src={Git} />
                                    <a className='proCardGL' href='https://github.com/JavierPolaris/Trabajo-Equipo.git'>View Code</a>


                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='contRect'>
                        <div className='contRect1'>
                            <div className='contenedorImg'>
                                <img src={Cuber1} className='proCard1' />
                            </div>
                            <div className='proCardText'>
                                <h1 className='proCardTextH'>
                                    Cuber
                                </h1>
                                <p className='proCardTexP'>
                                    Trabajo realizado en "The Bridge". Puedes pedir un coche con chofer, te dice el tiempo que tarda en llegar con utilización de mapas y geo localización
                                </p>
                                <p className='proCardTexTB'>
                                    <b>Tech stack:</b> Pug,EJS,CSS,Node.js,MongoDB,MySQL,
                                </p>
                                <div className='proCardW'>
                                    <img className='proCardG' src={Git} />
                                    <a className='proCardGL' href='https://github.com/JavierPolaris/Rol2.git'>View Code</a>


                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='contRect'>
                        <div className='contRect1'>
                            <div className='contenedorImg'>
                                <img src={Deporte} className='proCard2' />
                            </div>
                            <div className='proCardText'>
                                <h1 className='proCardTextH'>
                                    Cines Paradiso
                                </h1>
                                <p className='proCardTexP'>
                                    Trabajo realizado en "The Bridge", App para la compra de dorsales en pruebas deportivas, el cliente puede filtrar por comunidades o por deportes y realizar la inscripción.
                                </p>
                                <p className='proCardTexTB1'>
                                    <b>Tech stack:</b> React,Node.js,Sass,Express,Mongoose...
                                </p>
                                <div className='proCardW'>
                                    <img className='proCardG' src={Git} />
                                    <a className='proCardGL' href='https://github.com/JavierPolaris/Rol3.git'>View Code</a>


                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='contRect'>
                        <div className='contRect1'>
                            <div className='contenedorImg'>
                                <img src={Personal} className='proCard1' />
                            </div>
                            <div className='proCardText'>
                                <h1 className='proCardTextH'>
                                    Portafolios
                                </h1>
                                <p className='proCardTexP'>
                                    Primer portafolio para entender el funcionamiento de los conceptos básicos de la programación
                                </p>
                                <p className='proCardTexT'>
                                    <b>Tech stack:</b>HTML,Css,JavaScript
                                </p>
                                <div className='proCardW'>
                                    <img className='proCardG' src={Git} />
                                    <a className='proCardGL' href='https://github.com/JavierPolaris/Web-Personal.git'>View Code</a>


                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='contRect'>
                        <div className='contRect1'>
                            <div className='contenedorImg'>
                                <img src={Ruting} className='proCard1' />
                            </div>
                            <div className='proCardText'>
                                <h1 className='proCardTextH'>
                                    Red Social
                                </h1>
                                <p className='proCardTexP'>
                                    Trabajo realizado en "The Bridge". App de red social para ciclistas donde ademas de trabajar con entradas de texto/img... tambien muestra la geolocalizacion de tus contactos
                                </p>
                                <p className='proCardTexT'>
                                    <b>Tech stack:</b> React,Node.js,Sass,Node.js,<br></br>MongoDB/MySQL,JWT...
                                </p>
                                <div className='proCardW1'>
                                    <img className='proCardG' src={Git} />
                                    <a className='proCardGL' href='https://github.com/JavierPolaris/RutinBiker'>View Code</a>


                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='contRect'>
                        <div className='contRect1'>
                            <div className='contenedorImg'>
                                <img src={Tripulacion} className='proCard1' />
                            </div>
                            <div className='proCardText'>
                                <h1 className='proCardTextH'>
                                    Emancipatic
                                </h1>
                                <p className='proCardTexP'>
                                    Trabajo realizado en "The Bridge". Trabajo para Emacipatic ayuda a evaluar la accesibilidad las aplicaciones web de empresas...
                                </p>
                                <p className='proCardTexT'>
                                    <b>Tech stack:</b> React,Node.js,Sass,Node.js,<br></br>MongoDB/MySQL,JWT...
                                </p>
                                <div className='links'>
                                <div className='proCardW2'>
                                    <img className='proCardG' src={Git} />
                                    <a className='proCardGL' href='https://github.com/JavierPolaris/Heroku'>View Code</a>


                                </div>
                                <div className='proCardW2'>
                                    <img className='proCardG1' src={Link} />
                                    <a className='proCardGL' href='https://enigmatic-plateau-00138.herokuapp.com'>View Code</a>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        </div >

    )
}
