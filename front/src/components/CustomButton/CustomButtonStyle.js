import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  .button {}

    .button-wrapper {}

      .button-wrapper button {
        apperance: none;
        background: none;
        border: none;
        outline: none;
        font: inherit;
        font-size: ${({ theme }) => theme.text_m};
        font-weight: ${({ theme }) => theme.weight_m};
        border-radius: ${({ theme }) => theme.radius_m};
        padding: 0 16pt;
        line-height: 35pt;
        cursor: pointer;
        transition: all .12s ease-in-out;}

      .button-wrapper button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

        .primary .button-wrapper button {
          color: ${({ theme }) => theme.button.primary.color.main};
          background: ${({ theme }) => theme.button.primary.background.main};
          border: solid ${({ theme }) =>
            theme.button.primary.borderColor.main} 2px;}

          .primary .button-wrapper button:hover {
            color: ${({ theme }) => theme.button.primary.color.hover};
            background: ${({ theme }) => theme.button.primary.background.hover};
            border: solid ${({ theme }) =>
              theme.button.primary.borderColor.hover} 2px;}
  
          .primary .button-wrapper button:active {
            color: ${({ theme }) => theme.button.primary.color.active};
            background: ${({ theme }) =>
              theme.button.primary.background.active};
            border: solid ${({ theme }) =>
              theme.button.primary.borderColor.active} 2px;}
        

        .secondary .button-wrapper button {
          color: ${({ theme }) => theme.button.secondary.color.main};
          background: ${({ theme }) => theme.button.secondary.background.main};
          border: solid ${({ theme }) =>
            theme.button.secondary.borderColor.main} 2px;}

          .secondary .button-wrapper button:hover {
            color: ${({ theme }) => theme.button.secondary.color.hover};
            background: ${({ theme }) =>
              theme.button.secondary.background.hover};
            border: solid ${({ theme }) =>
              theme.button.secondary.borderColor.hover} 2px;}
  
          .secondary .button-wrapper button:active {
            color: ${({ theme }) => theme.button.secondary.color.active};
            background: ${({ theme }) =>
              theme.button.secondary.background.active};
            border: solid ${({ theme }) =>
              theme.button.secondary.borderColor.active} 2px;}


`;
