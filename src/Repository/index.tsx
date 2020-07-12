import React from 'react';
/** useRouteMatch - possui as informações da requisição */
import { useRouteMatch } from 'react-router-dom';

/** Utilizado para definir o retorno useRouteMatch  e eliminar warning */
interface RepositoryParams {
  repository: string;
}

/** 
 * React.FC - identifica que um componente foi escrito em formado de função 
 * Mesmo que "function Dashboard() {}", porém dificulta a tipagem do componente
 * */ 
const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return <h1>Repositories:{params.repository}</h1>
}

export default Repository;
