import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * Configurações globais do CSS
 */
import GlobalStyles from './styles/global';

import Routes from './routes';

/**
 * Forma reduzida
 * const App: React.FC = () => <Routes />
 * 
 * BrowserRouter - indica que as rotas são acessíveis através das urls
 *  */ 
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
}

export default App;
