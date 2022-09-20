import React, { useEffect } from 'react';
import emailjs from 'emailjs-com'
import Cabecera from '../components/Cabecera'
import Swamp from '../assets/img/swamp.png'
import LogoJavi from '../assets/img/logoJavi.png'








export default function Contact() {



    function enviarEmail(e){
        e.preventDefault()

        emailjs.sendForm('service_144jk31','template_epwmq21',e.target,'frKe4cxO-_IBJUczn')

    }





    return (
        <div className='projects'>
            <Cabecera />
            <div className='contenCon'>
                  <img className='imgSwamp' src={Swamp} /> 
                  </div>
            <a className='social1' href='/home'><img className='imgH1' src={LogoJavi} /></a>
            <div className="imgTop">
                <div className='contenedorCont'>
                    <h2 className="contactImg">¿Quieres que hablemos?</h2>
                    <section className='contact'>
                        <div className="cuerpoText">
                            <h3 >Puedes contactar conmigo cuando quieras</h3>
                            <p className='pContact'>Estoy deseando que hablemos!!</p>
                            <section id='rrss1' className='contact-section'>

                                <div className='contact-links'>
                                    <a

                                        href='https://www.linkedin.com/in/javierg-rcanton/'
                                        target='_blank'
                                        className='btn1 contact-details'>
                                        <i class='fab fa-facebook-square'></i>
                                        Linkedin</a
                                    >
                                    <a
                                        id='profile-link'
                                        href='https://github.com/JavierPolaris'
                                        target='_blank'
                                        className='btn1 contact-details'
                                    ><i className='fab fa-github'></i>
                                        Github</a
                                    >
                                    <a
                                        id='profile-link'
                                        href='https://twitter.com/JavierPolaris'
                                        target='_blank'
                                        className='btn1 contact-details'
                                    ><i className='fab fa-twitter'></i>
                                        twitter</a
                                    >
                                </div>
                            </section>
                        </div>
                        <div class="signupFrm">
                            <form action="" className="form" onSubmit={enviarEmail}>
                                <h1 className="title">Contact</h1>

                                <div className="inputContainer">
                                    <input type="text" className="input" placeholder="a" name='email' required />
                                    <label for="" className="label">Email</label>
                                </div>

                                <div className="inputContainer">
                                    <input type="text" className="input" placeholder="a" name='nombre' required />
                                    <label for="" className="label">Name</label>
                                </div>

                                <div class="inputContainer">
                                    <input type="text" className="input" placeholder="a"  name='mensaje' required />
                                    <label for="" className="label">Company</label>
                                </div>

                                <input type="submit" className="submitBtn" value="Sign up" />
                            </form>
                        </div>
                    </section>
                </div>
           
            </div>



        </div >

    )
}
