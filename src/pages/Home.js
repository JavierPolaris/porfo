import React, { useEffect } from 'react';
import Nosfe from '../assets/img/nosfe.png'
import Elipse from '../assets/img/Ellipse.png'
import LogoJavi from '../assets/img/logoJavi.png'
import Twiter from '../assets/img/twiter.png'
import Git from '../assets/img/githab.png'
import Linkedin from '../assets/img/linkedin.png'
import Be from '../assets/img/beance.png'
import Cabecera from '../components/Cabecera'







export default function Home() {



        function about(){
            window.location.assign("/homeJuego");
        }
        

  



    return (
        <div className='home'>
            <Cabecera/>
            <div className='logoJ'>
                <img src={LogoJavi} className='logo'/>
                <h1 className='textLo'>POLARIS</h1>
            </div>
            <h1 className='nombre1'>JAVIER</h1>
            <h1 className='nombre2'>GARCÍA-ROJO</h1>
            <div className='imagencent'>
            <img src={Nosfe} className='nosfe'/>
            <img src={Elipse} className='elipse'/>
            </div>
           
            <div className='yoHome'>
                <h1 className='Full'>JUNIOR FULL STACK DEVELOP </h1>
                <div className='full'>
                <h1 className='Full1'>Front</h1>
                <h1 className='Full1A'>END </h1>
                </div>
                <div className='full'>
                <h1 className='Full1'>Back </h1>
                <h1 className='Full1B'>END </h1>
                </div>

            </div>
            <div className='rrssH'>
            <a className='social' href='https://twitter.com/JavierPolaris'><img className='imgH' src={Twiter}/></a>
            <a className='social' href='https://github.com/JavierPolaris'><img className='imgH' src={Git}/></a>
            <a className='social' href='https://www.linkedin.com/in/javierg-rcanton/'><img className='imgH' src={Linkedin}/></a>
            <a className='social' href='https://www.behance.net/javierrojo' ><img className='imgH' src={Be}/></a>
            </div>
        
        </div >

    )
}
