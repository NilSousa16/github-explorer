import React, { useEffect, useState } from 'react';
/** useRouteMatch - possui as informações da requisição */
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

/** Utilizado para definir o retorno useRouteMatch  e eliminar warning */
interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };  
}

interface Issue {
  id: number;
  title:string;
  html_url: string;
  user: {
    login: string;
  }
}

/** 
 * React.FC - identifica que um componente foi escrito em formado de função 
 * Mesmo que "function Dashboard() {}", porém dificulta a tipagem do componente
 * */ 
const Repository: React.FC = () => {
  // useState - responsável por armazenar o estado 
  // <Repository | null> - useState pode utilizar os dois tipos 
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  // Função disparada ao modificar variável
  // Ao carregar a página ele será carregado
  useEffect(() => {
    // Solicita dados sobre o repositório
    // Requisição realizada a API e depois armazenado em response
    // Logo após é executado a função escrita
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    })
    // Solicita dados sobre as issues
    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    })
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer"/>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      { repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo> 
      )}

      <Issues>
        {issues.map((issue) => (
          <a target="blank" key={issue.id} href={issue.html_url}>
          <div>
            <strong>{issue.title}</strong>
            <p>{issue.user.login}</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
