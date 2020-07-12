import { createGlobalStyle } from 'styled-components';

import githubBackground from '../assets/github-background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
    /** Suaviza a fonte no chrome */
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px, Roboto, sans-serif;
  }

  /** Div que vai ser montada a aplicação */
  #root {
    max-width: 960px;
    /** Centraliza */
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;