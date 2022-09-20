import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeJ from '../pages/HomeJ';
import Home from '../pages/Home';
import Juego from '../pages/Juego';
import About from '../pages/AboutMe';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';

class Main extends Component {

    render() {
      return (
        <div>
          
          <Routes basename={process.env.PUBLIC_URL}>
            
            <Route path='/' element={<Home />} />
            <Route path='/homeJuego' element={<HomeJ />} />
            <Route path='/porfo' element={<Home />} />
            <Route path='/juego' element={<Juego />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*'element={<Home />} />
          </Routes>
        </div>
      );
    }
  
    
  
  
  
  }
  export default Main;