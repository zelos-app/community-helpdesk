import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .dashboard-nav {
  background-color: ${({ theme }) => theme.body} !important;
    border-bottom: 1px solid ${({ theme }) => theme.primary} !important;
    margin-bottom: 2em;
    display: flex;

    .dashboard-nav__item {
      color: ${({ theme }) => theme.primary} !important;
      transition: color .2s ease;
    }

    .dashboard-nav__item:hover {
      color: ${({ theme }) => theme.secondary} !important;
    }

    .dashboard-nav__item:not(:last-of-type) {
      margin-right: .5em;
    }

    .dashboard-nav__item--active {
      color: ${({ theme }) => theme.secondary} !important;
    }
  }
`
