import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  .input {
    display: flex;
    width: 100%;}

    .input-wrapper {
      display: flex;
      flex-grow: 1;
      flex-direction: column;}

      .input-wrapper.layout-checkbox {
        flex-grow: unset;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;}

      .input-wrapper label {
        color: ${({ theme }) => theme.input.label.color.main};
        font-size: ${({ theme }) => theme.text_m};
        font-weight: ${({ theme }) => theme.weight_m};
        border-radius: ${({ theme }) => theme.radius_m};
        margin-bottom: 3pt;
        cursor: pointer;}

      .input-wrapper input,
      .input-wrapper textarea,
       .input-wrapper select{
        apperance: none;
        background: none;
        border: none;
        outline: none;
        font: inherit;
        font-size: ${({ theme }) => theme.text_m};
        font-weight: ${({ theme }) => theme.weight_m};
        border-radius: ${({ theme }) => theme.radius_m};
        padding: 0 16pt;
        transition: all .12s ease-in-out;}

        .input-wrapper input[type=checkbox] {
          position: absolute;
          width: 120%;
          height: 120%;
          top: -40%;
          left: -40%;
          opacity: 0;}

        .checkbox {
          border: solid ${({ theme }) =>
            theme.input.primary.borderColor.main} 2px;
          width: ${({ theme }) => theme.text_m};
          height: ${({ theme }) => theme.text_m};
          border-radius: ${({ theme }) => theme.radius_m};
          position: relative;
          margin-right: 6px;}

          .checkbox.is-checked {
            border: solid ${({ theme }) =>
              theme.input.primary.borderColor.hover} 2px;}

            .checkbox.is-checked:after {
              content: '';
              position: absolute;
              height: 7px;
              pointer-events: none;
              width: 9px;
              border-left: solid ${({ theme }) =>
                theme.input.primary.borderColor.hover} 2px;
              border-bottom: solid ${({ theme }) =>
                theme.input.primary.borderColor.hover} 2px;
              transform: rotate(-45deg);
              left: 3px;
              top: 3px;}


        .input-wrapper textarea {
          padding-top: 10pt ;
          line-height: 1.6em;}

        .primary .input-wrapper input,
        .primary .input-wrapper textarea,
        .primary .input-wrapper select{
          color: ${({ theme }) => theme.input.primary.color.main};
          background: ${({ theme }) => theme.input.primary.background.main};
          border: solid ${({ theme }) =>
            theme.input.primary.borderColor.active} 2px;}

          .primary .input-wrapper input:hover,
          .primary .input-wrapper textarea:hover {
            background: ${({ theme }) => theme.input.primary.background.hover};
            border: solid ${({ theme }) =>
              theme.input.primary.borderColor.hover} 2px;}

          .primary .input-wrapper input:active,
          .primary .input-wrapper textarea:active,
            .primary .input-wrapper select:active{
            background: ${({ theme }) => theme.input.primary.background.active};
            border: solid ${({ theme }) =>
              theme.input.primary.borderColor.active} 2px;}
            
          .primary .input-wrapper input:focus,
          .primary .input-wrapper textarea:focus,
            .primary .input-wrapper select:focus{
            background: ${({ theme }) => theme.input.primary.background.focus};
            border: solid ${({ theme }) =>
              theme.input.primary.borderColor.focus} 2px;}

        .secondary .input-wrapper input,
        .secondary .input-wrapper textarea,
          .secondary .input-wrapper select{
          color: ${({ theme }) => theme.input.secondary.color.main};
          background: ${({ theme }) => theme.input.secondary.background.main};
          border: solid ${({ theme }) =>
            theme.input.secondary.borderColor.active} 2px;}

          .secondary .input-wrapper input:hover,
          .secondary .input-wrapper textarea:hover,
           
            .secondary .input-wrapper select:hover{
            background: ${({ theme }) =>
              theme.input.secondary.background.hover};
            border: solid ${({ theme }) =>
              theme.input.secondary.borderColor.hover} 2px;}

          .secondary .input-wrapper input:active,
          .secondary .input-wrapper textarea:active,
            .secondary .input-wrapper select:active{
            background: ${({ theme }) =>
              theme.input.secondary.background.active};
            border: solid ${({ theme }) =>
              theme.input.secondary.borderColor.active} 2px;}

          .secondary .input-wrapper input:focus,
          .secondary .input-wrapper textarea:focus,
            .secondary .input-wrapper select:focus{
            background: ${({ theme }) =>
              theme.input.secondary.background.focus};
            border: solid ${({ theme }) =>
              theme.input.secondary.borderColor.focus} 2px;}
`;
