import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => {
  return (
  <Switch>
    {/**
     * Switch - evita que todas as rotas válidas seja mostradas
     * path - caminho url
     * component - componente a ser carregado
     * exact - necessário para realizar uma verificação de igualdade e não de 
     * inclusão pelo react-router-dom
     */}
    <Route path="/" exact component={Dashboard} />
    {/**
     * Teste com somente "/repositories/" funcionou
     * :repository+ - identificação da continuação do endereço (+ serve caso exista outra / no caminho)
     */}
    <Route path="/repositories/:repository+" component={Repository} />
  </Switch>
  );
}

export default Routes;

