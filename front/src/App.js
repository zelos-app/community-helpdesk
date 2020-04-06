import React, {useState} from 'react'
import {ThemeProvider} from 'styled-components'
import {IntlProvider} from 'react-intl'
import Router from './Router'
import {Link} from 'react-router-dom'

// Styles
import {lightTheme, darkTheme} from './styles/theme'
import {GlobalStyles} from './styles/global'

// Translations
import translations_en from './translations/en.json'
import translations_et from './translations/et.json'

// i18 configs
const i18nConfig = {
  defaultLocale: 'et',
  messages: {
    'en': translations_en,
    'et': translations_et,
  }
}

export default () => {
  const [theme, setTheme] = useState('light')
  const [locale, setLocale] = useState(i18nConfig.defaultLocale)
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  const selectedTheme = {
    'light': lightTheme,
    'dark': darkTheme
  }[theme]

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={i18nConfig.defaultLocale}
      messages={i18nConfig.messages[locale]}>
      <ThemeProvider theme={selectedTheme}>

        {/* Include global styles */}
        <GlobalStyles />

        {/* Change theme */}
        <button onClick={toggleTheme}>theme</button>

        {/* Change language */}
        <button onClick={ () => setLocale('en')}>en</button>
        <button onClick={ () => setLocale('et')}>et</button>

        {/* Routes */}
        <Router />

      </ThemeProvider>
    </IntlProvider>
  )
}