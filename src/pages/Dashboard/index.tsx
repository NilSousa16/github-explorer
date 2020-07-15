/**
 * useState - armazenar informações de estado
 * FormEvent - evento do formulário, usado para previnir o recarregamento da página
 * useEffect - utilizado para dispara uma função quando uma variável é alterada
 */
import React, { useState, FormEvent, useEffect } from 'react';

import logoImg from '../../assets/logo.svg';

import { FiChevronRight } from 'react-icons/fi';
/**
 * Configuração do axios para conexão com API
 */
import api from '../../services/api';

import { Link } from 'react-router-dom';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

/**
 * Mesmo que "function Dashboard() {}", porém dificulta a tipagem do componente
 */
/**
 * React.FC - identifica que um componente foi escrito em formado de função
 */
const Dashboard: React.FC = () => {

  /**
   * Variável para armazenar dados, função de modificação dos dados e 
   * inicialização do formado a ser utilizado
   */
  /**
   * Recomendado setar o tipo da variável repositories (quando esse tipo é personalizado) 
   * para evitar alertas no uso de setRepositories
   */
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    /**
     * localStorage.getItem(<identificado por>) - busca valores no localStorage
     */    
    const storagedRepositories = localStorage.getItem('@GithubExplorer:repositories');

    if(storagedRepositories) {
      /**
       * Convertendo JSON para array
       * O retorno vai ser o valor da variável repositories
       */
      return JSON.parse(storagedRepositories);
    }
  });
  /**
   * Armazenar estado do input
   */
  const [newRepo, setNewRepo] = useState('');

  /**
   *  Estado para mensagens de erro
   */
  const [inputError, setInputError] = useState('');

  /** 
   *  Modificações em repositories dispara a função do primeiro parâmetro
   * localStorage.setItem(<endereço armazenado>, <conversão do array para JSON>);
   */
  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories', 
      JSON.stringify(repositories));
  }, [repositories]);

  /**
   * event: FormEvent<HTMLFormElement> - necessário para previnir o recarregamento da página
   * 
   * event - evento / FormEvent - representa o evento do formulário / 
   * HTMLFormElement - representa o elemento html do form
   */
  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    /**
     * Responsável por não recarregar a página no submit
     */
    event.preventDefault();

    if(!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try{
      /**
       *  Tipo do retorno do get
       */ 
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([ repository, ...repositories]);
      setNewRepo('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca pelo repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>
     
      {/** e.target.value */}
      {/** hasError -  */}
      {/** !!inputError - converte string para boolean */}
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input           
          value={newRepo}          
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      {/** Condicional - componente só é mostrado se inputError tiver algo */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
          <img 
            src={repository.owner.avatar_url} 
            alt={repository.owner.login}
          />

          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>

          <FiChevronRight size={20} />
        </Link>
        ))} 
      </Repositories>
    </>
  );
}

export default Dashboard;

