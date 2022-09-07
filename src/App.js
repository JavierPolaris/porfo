import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainComponent from "./components/Main";

import './sass/Stile.scss';

function App() {
  return (
    <BrowserRouter>
    
    <MainComponent />
   
  </BrowserRouter>
  );
}

export default App;

