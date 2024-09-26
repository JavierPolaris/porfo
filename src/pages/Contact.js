import React, { useEffect, useState } from 'react';
import Swamp from '../assets/img/MiguelAngel.jpg';
import '../sass/contact.css';
import Navbar from '../components/Navbar';

function Contact() {
    // Estado para gestionar los datos del formulario
    const [formData, setFormData] = useState({
        email: '',
        nombre: '',
        mensaje: ''
    });

    // Estado para saber si el formulario ha sido enviado
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    // Cambiar el background del body y el color del navbar
    useEffect(() => {
        document.body.style.backgroundColor = '#536b81';
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.backgroundColor = 'rgb(255, 155, 0)';
        }

        // Limpiar el estilo al salir de la página de contacto
        return () => {
            document.body.style.backgroundColor = '';
            if (navbar) {
                navbar.style.backgroundColor = '';
            }
        };
    }, []);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Enviar los datos al backend usando fetch
        fetch('http://localhost:5000/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                setIsFormSubmitted(true);  // Si el envío es exitoso, mostrar el mensaje de éxito
            } else {
                console.error('Error al enviar el correo');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    };

    return (
        <div className='contactM'>
            <Navbar />
            <div className='contactoCont'>
                <div className='contenCon'>
                    <img className='imgSwamp' src={Swamp} alt="Imagen Swamp" />
                </div>
                <div className="imgTop">
                    <div className='contenedorCont'>
                        <h2 className="contactImg">¿Quieres que<br />hablemos?</h2>
                        <section className='contact'>
                            <div className="cuerpoText">
                                <h3 className='textContM'>Puedes contactar conmigo cuando quieras</h3>
                                <p className='pContact'>Estoy deseando que hablemos!!</p>
                                <section id='rrss1' className='contact-section'>
                                    <div className='contact-links'>
                                        <a href='https://www.linkedin.com/in/javierg-rcanton/' target='_blank' className='contact-details'>
                                            Linkedin
                                        </a>
                                        <a href='https://github.com/JavierPolaris' target='_blank' className='contact-details'>
                                            Github
                                        </a>
                                        <a href='https://twitter.com/JavierPolaris' target='_blank' className='contact-details'>
                                            Twitter
                                        </a>
                                    </div>
                                </section>
                            </div>

                            {/* Mostrar el formulario solo si no se ha enviado */}
                            {!isFormSubmitted ? (
                                <div className="signupFrm">
                                    <form className="form" onSubmit={handleSubmit}>
                                        <h1 className="title">Contact</h1>

                                        <div className="inputContainer">
                                            <input 
                                                type="email" 
                                                className="input" 
                                                name='email' 
                                                value={formData.email} 
                                                onChange={handleChange} 
                                                placeholder="Tu email" 
                                                required 
                                            />
                                            <label className="label">Email</label>
                                        </div>

                                        <div className="inputContainer">
                                            <input 
                                                type="text" 
                                                className="input" 
                                                name='nombre' 
                                                value={formData.nombre} 
                                                onChange={handleChange} 
                                                placeholder="Tu nombre" 
                                                required 
                                            />
                                            <label className="label">Nombre</label>
                                        </div>

                                        <div className="inputContainer">
                                            <textarea 
                                                className="input" 
                                                name='mensaje' 
                                                value={formData.mensaje} 
                                                onChange={handleChange} 
                                                placeholder="Tu mensaje" 
                                                required 
                                            />
                                            <label className="label">Mensaje</label>
                                        </div>

                                        <input type="submit" className="submitBtn" value="Enviar" />
                                    </form>
                                </div>
                            ) : (
                                // Mostrar mensaje de éxito cuando se haya enviado el formulario
                                <h3 className="mensaje-enviado">¡Mensaje enviado!</h3>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
