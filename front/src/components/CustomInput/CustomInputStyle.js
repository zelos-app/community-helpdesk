import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .input {
    display: flex;
    width: 100%;}

    .input-wrapper {
      display: flex;
      flex-grow: 1;
      flex-direction: column;}

      .input-wrapper label {
        color: ${({ theme }) => theme.input.label.color.main};
        font-size: ${({ theme }) => theme.text_m};
        font-weight: ${({ theme }) => theme.weight_m};
        border-radius: ${({ theme }) => theme.radius_m};
        margin-bottom: 3pt;}

      .input-wrapper input,
      .input-wrapper textarea {
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

        .primary .input-wrapper input,
        .primary .input-wrapper textarea {
          color: ${({ theme }) => theme.input.primary.color.main};
          background: ${({ theme }) => theme.input.primary.background.main};
          border: solid ${({ theme }) => theme.input.primary.borderColor.main} 2px;}

          .primary .input-wrapper input:hover,
          .primary .input-wrapper textarea:hover {
            background: ${({ theme }) => theme.input.primary.background.hover};
            border: solid ${({ theme }) => theme.input.primary.borderColor.hover} 2px;}

          .primary .input-wrapper input:active,
          .primary .input-wrapper textarea:active {
            background: ${({ theme }) => theme.input.primary.background.active};
            border: solid ${({ theme }) => theme.input.primary.borderColor.active} 2px;}
            
          .primary .input-wrapper input:focus,
          .primary .input-wrapper textarea:focus {
            background: ${({ theme }) => theme.input.primary.background.focus};
            border: solid ${({ theme }) => theme.input.primary.borderColor.focus} 2px;}

        .secondary .input-wrapper input,
        .secondary .inputtextareawrapper input {
          color: ${({ theme }) => theme.input.secondary.color.main};
          background: ${({ theme }) => theme.input.secondary.background.main};
          border: solid ${({ theme }) => theme.input.secondary.borderColor.main} 2px;}

          .secondary .input-wrapper input:hover,
          .secondary .input-wrapper textarea:hover {
            background: ${({ theme }) => theme.input.secondary.background.hover};
            border: solid ${({ theme }) => theme.input.secondary.borderColor.hover} 2px;}

          .secondary .input-wrapper input:active,
          .secondary .input-wrapper textarea:active {
            background: ${({ theme }) => theme.input.secondary.background.active};
            border: solid ${({ theme }) => theme.input.secondary.borderColor.active} 2px;}

          .secondary .input-wrapper input:focus,
          .secondary .input-wrapper textarea:focus {
            background: ${({ theme }) => theme.input.secondary.background.focus};
            border: solid ${({ theme }) => theme.input.secondary.borderColor.focus} 2px;}
`