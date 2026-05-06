import React, { useEffect, useState } from 'react';
import Swamp from '../assets/img/MiguelAngel.jpg';
import '../sass/contact.css';
import Navbar from '../components/Navbar';

function Contact() {
    const [formData, setFormData] = useState({ email: '', nombre: '', mensaje: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = '#536b81';
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.backgroundColor = 'rgb(255, 155, 0)';
        return () => {
            document.body.style.backgroundColor = '';
            if (navbar) navbar.style.backgroundColor = '';
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(false);

        fetch('https://porfo-rho.vercel.app/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => {
                setIsSubmitting(false);
                if (response.ok) {
                    setIsFormSubmitted(true);
                } else {
                    setSubmitError(true);
                }
            })
            .catch(() => {
                setIsSubmitting(false);
                setSubmitError(true);
            });
    };

    return (
        <div className='contactM'>
            <Navbar />
            <div className='contactoCont'>
                <div className='contenCon'>
                    <img className='imgSwamp' src={Swamp} alt="Javier García-Rojo Cantón" />
                </div>
                <div className="imgTop">
                    <div className='contenedorCont'>
                        <h2 className="contactImg">¿Quieres que<br />hablemos?</h2>
                        <section className='contact'>
                            <div className="cuerpoText">
                                <h3 className='textContM'>Puedes contactar conmigo cuando quieras</h3>
                                <p className='pContact'>¡Estoy deseando que hablemos!</p>
                                <section id='rrss1' className='contact-section'>
                                    <div className='contact-links'>
                                        <a href='https://www.linkedin.com/in/javierg-rcanton/' target='_blank' rel='noreferrer' className='contact-details'>
                                            LinkedIn
                                        </a>
                                        <a href='https://github.com/JavierPolaris' target='_blank' rel='noreferrer' className='contact-details'>
                                            GitHub
                                        </a>
                                        <a href='https://twitter.com/JavierPolaris' target='_blank' rel='noreferrer' className='contact-details'>
                                            Twitter
                                        </a>
                                    </div>
                                </section>
                            </div>

                            {!isFormSubmitted ? (
                                <div className="signupFrm">
                                    <form className="form" onSubmit={handleSubmit}>
                                        <h1 className="title">Contacto</h1>

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

                                        <div className="inputContainer inputContainer--textarea">
                                            <textarea
                                                className="input input--textarea"
                                                name='mensaje'
                                                value={formData.mensaje}
                                                onChange={handleChange}
                                                placeholder="Tu mensaje"
                                                required
                                            />
                                            <label className="label">Mensaje</label>
                                        </div>

                                        {submitError && (
                                            <p className="error-msg">
                                                Error al enviar. Inténtalo de nuevo.
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            className="submitBtn"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Enviando…' : 'Enviar'}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="success-msg">
                                    <p className="success-icon">✓</p>
                                    <h3>¡Mensaje enviado!</h3>
                                    <p>Te responderé lo antes posible.</p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
