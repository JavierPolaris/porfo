import { useState } from 'react';


const Cabecera = () => {

    const [ menu , setMenu ] = useState( false )

    const toggleMenu = () => {
        setMenu( !menu )
    }

    return (
    <header className="Cabecera">
        <h1 className="Cabecera-h1">
            <a href="#" className="Cabecera-a">
                Suscríbete
            </a>
        </h1>

        <button 
            onClick={ toggleMenu }
         className="Cabecera-button">
        <svg className='Cabecera-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
        </button>

        <nav className={ `Cabecera-nav ${ menu ? 'isActive' : '' }` }>
            <ul className="Cabecera-ul">
                <li className="menu"><a href="/homeJuego" className="Cabecera-a">ABOUT</a></li>
                <li className="menu"><a href="/projects" className="Cabecera-a">PROJECT</a></li>
                <li className="menu"><a href="contact" className="Cabecera-a">CONTACT</a></li>
               
            </ul>
        </nav>

    </header>
)
}

export default Cabecera