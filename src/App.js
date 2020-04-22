import React, { useEffect, useState, Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Container from "@material-ui/core/Container";

import Router from "./Router";
import { isLoggedIn, LoggedInContext } from "./utils/auth";
import { loadLocales } from "./utils/locale";

// Styles
import { lightTheme, variables } from "./styles/theme";
import { GlobalStyles } from "./styles/global";
import "./main.scss";
// Translations
import translations_en from "./translations/en.json";
import translations_et from "./translations/et.json";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { Bar, LangBar } from "./components/Bar";

// i18 configs
const i18nConfig = {
  defaultLocale: "en",
  messages: {
    en: translations_en,
    et: translations_et,
  },
};

// TODO: ThemeProvider throws error I suppose because when we started moving to Material UI it want the MUI theme provider. This is styled.

export default () => {
  const [isLogged, setLogged] = useState(isLoggedIn());

  const [locale, setLocale] = useState(i18nConfig.defaultLocale);

  const [messages, setMessage] = useState(i18nConfig.messages);

  const [isLoaded, setIsLoaded] = useState(false);

  const loadLocale = () =>
    loadLocales().then((locales) => {
      setMessage({
        ...messages,
        [locale]: { ...messages[locale], ...locales },
      });
      setIsLoaded(true);
    });

  const selectLanguage = (lang) => {
    setLocale(lang);
    loadLocale(lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // load locales
    loadLocale();
  }, []);

  if (!isLoaded) {
    return (
      <ThemeProvider theme={{ ...lightTheme, ...variables }}>
        <LoadingSpinner />
      </ThemeProvider>
    );
  }

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={i18nConfig.defaultLocale}
      messages={messages[locale]}
    >
      <ThemeProvider theme={{ ...lightTheme, ...variables }}>
        <LoggedInContext.Provider value={{ data: isLogged, set: setLogged }}>
          {/* Include global styles */}
          <GlobalStyles />
          {/*isLogged && (
                <Bar
                  locale={locale}
                  isLoggedIn={isLogged} 
                  setLogged={setLogged}
                />
              )*/}

          <Container maxWidth="xl">
            <LangBar langs={["en", "et"]} selectLanguage={selectLanguage} />
            <Router />
          </Container>
        </LoggedInContext.Provider>
      </ThemeProvider>
    </IntlProvider>
  );
};
