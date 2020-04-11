import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { IntlProvider } from "react-intl";
import Container from "@material-ui/core/Container";
import Router from "./Router";
import "./main.scss";

// Styles
import { lightTheme, darkTheme, variables } from "./styles/theme";
import { GlobalStyles } from "./styles/global";

// Translations
import translations_en from "./translations/en.json";
import translations_et from "./translations/et.json";

// i18 configs
const i18nConfig = {
  defaultLocale: "et",
  messages: {
    en: translations_en,
    et: translations_et,
  },
};

export default () => {
  const [theme, setTheme] = useState("dark");
  const [locale, setLocale] = useState(i18nConfig.defaultLocale);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const selectLanguage = (lang) => {
    setLocale(lang);
    document.documentElement.lang = lang;
  };

  const selectedTheme = {
    light: lightTheme,
    dark: darkTheme,
  }[theme];

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={i18nConfig.defaultLocale}
      messages={i18nConfig.messages[locale]}
    >
      <ThemeProvider theme={{ ...selectedTheme, ...variables }}>
        {/* Include global styles */}
        <GlobalStyles />
        <Container maxWidth="xl">
          {/* Change theme */}
          <button onClick={toggleTheme}>theme</button>

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
