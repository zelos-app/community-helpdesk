import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

  .loading-bar-spinner {
    position: relative;
    min-height: 60px;}

    .loading-bar-spinner-wrapper {
      left: 50%;
      margin-left: -20px;
      top: 50%;
      margin-top: -20px;
      position: absolute;
      z-index: 19 !important;
      animation: loading-bar-spinner 400ms linear infinite;}

      .loading-bar-spinner-wrapper .spinner-icon {
        width: 40px;
        height: 40px;
        border:  solid 4px transparent;
        border-top-color: ${({ theme }) => theme.primary} !important;
        border-left-color: ${({ theme }) => theme.primary} !important;
        border-radius: 50%;}

@keyframes loading-bar-spinner {
  0%   { transform: rotate(0deg);   transform: rotate(0deg); }
  100% { transform: rotate(360deg); transform: rotate(360deg); }
}
`;
