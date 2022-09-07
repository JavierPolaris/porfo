import React from 'react';
import { HashRouter } from 'react-router-dom';
import MainComponent from "./components/Main";

import './sass/Stile.scss';

function App() {
  return (
    <HashRouter>
    
    <MainComponent />
   
  </HashRouter>
  );
}

export default App;

