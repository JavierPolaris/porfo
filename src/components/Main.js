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
            <Route path='*' element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </div>
      );
    }
  
    
  
  
  
  }
  export default Main;