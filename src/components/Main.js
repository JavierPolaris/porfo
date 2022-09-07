import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Juego from '../pages/Juego';
import About from '../pages/AboutMe';

class Main extends Component {

    render() {
      return (
        <div>
          
          <Routes>
            
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/juego' element={<Juego />} />
            <Route path='/about' element={<About />} />
           
          </Routes>
        </div>
      );
    }
  
    
  
  
  
  }
  export default Main;