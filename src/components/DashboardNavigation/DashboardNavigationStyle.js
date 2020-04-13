import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  .dashboard-nav {
    border-bottom: 1px solid ${({ theme }) => theme.primary};
    padding-bottom: .5em;
    margin-bottom: 2em;
    display: flex;

    .dashboard-nav__item {
      color: ${({ theme }) => theme.secondary};
      transition: color .2s ease;
    }

    .dashboard-nav__item:hover {
      color: ${({ theme }) => theme.primary};
    }

    .dashboard-nav__item:not(:last-of-type) {
      margin-right: .5em;
    }

    .dashboard-nav__item--active {
      color: ${({ theme }) => theme.primary};
    }
  }
`
