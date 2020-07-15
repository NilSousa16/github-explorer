import styled, { css } from 'styled-components';
// Trabalhar com cores
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3A3A3A; 
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 40px;
  max-width: 700px;
  /** Forçar elementos a ficarem lado a lado */
  display: flex;

  input {
    /** Ocupar todo espaço */
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;  

    ${(props) => props.hasError && 
    css`
      border-color: #c53030;
    `}

    &:placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #04d361;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    /**& - se refere ao componente */
    &:hover {
      background: ${shade(0.2, '#04d361')}
    }
  }  
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    /** Alinha no eixo vertical */
    align-items: center;
    transition: transform 0.5s;

    /** Elemento precedido a + a */
    & + a {
      margin-top: 16px;
    }

    &:hover {
      /** Desloca no eixo X */
      transform: translateX(20px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      margin: 0 16px;

      strong {
        font-size: 20px;
        color: #3D3D4D;
      }

      p {
        font-size: 18px;
        color: #A8A8B3;
        margin-top: 4px;
      }
    }

    svg {
      /** Usa todo o espaço a esquerda como margem */
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;