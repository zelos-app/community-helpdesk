import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Container from "@material-ui/core/Container";
import Router from "./Router";
import "./main.scss";
import { MuiThemeProvider } from '@material-ui/core';

// Styles
import { lightTheme, darkTheme, variables } from "./styles/theme";
import { GlobalStyles } from "./styles/global";

// Translations
import translations_en from "./translations/en.json";
import translations_et from "./translations/et.json";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// i18 configs
const i18nConfig = {
  defaultLocale: "et",
  messages: {
    en: translations_en,
    et: translations_et,
  },
};

export default () => {
  const [locale, setLocale] = useState(i18nConfig.defaultLocale);

  const selectLanguage = (lang) => {
    setLocale(lang);
    document.documentElement.lang = lang;
  };

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={i18nConfig.defaultLocale}
      messages={i18nConfig.messages[locale]}
    >
      <ThemeProvider theme={{ ...lightTheme, ...variables }}>
        {/* Include global styles */}
        <GlobalStyles />
        <Container maxWidth="xl">

          {/* Change language */}
          <button onClick={() => selectLanguage("en")}>en</button>
          <button onClick={() => selectLanguage("et")}>et</button>

          {/* Routes */}
          <Router />
        </Container>
      </ThemeProvider>
    </IntlProvider>
  );
};
