import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Container from "@material-ui/core/Container";
import Router from "./Router";
import { isLoggedIn, LoggedInContext } from "./utils/auth";
import "./main.scss";

// Styles
import { lightTheme, variables } from "./styles/theme";
import { GlobalStyles } from "./styles/global";

// Translations
import translations_en from "./translations/en.json";
import translations_et from "./translations/et.json";
import { Bar } from "./components/Bar/Bar";

// i18 configs
const i18nConfig = {
  defaultLocale: "en",
  messages: {
    en: translations_en,
    et: translations_et,
  },
};

export default () => {
  const [isLogged, setLogged] = useState(isLoggedIn());

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
      // TODO: This throws error I suppose because when we started moving to Material UI it want the MUI theme provider. This is styled.
      <ThemeProvider theme={{ ...lightTheme, ...variables }}>
        <LoggedInContext.Provider value={{ data: isLogged, set: setLogged }}>
          {/* Include global styles */}
          <GlobalStyles />

          <Bar
            locale={locale}
            selectLanguage={selectLanguage}
            isLoggedIn={isLogged}
            setLogged={setLogged}
          />

          <Container maxWidth="xl">
            <Router />
          </Container>
        </LoggedInContext.Provider>
      </ThemeProvider>
    </IntlProvider>
  );
};
