import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { LangBar } from "../../components/Bar";
import useLocale, { setLocale } from "../../hooks/useLocale";

const Intro = () => {
  const [{ locale, locales, loading }] = useLocale();

  return (
    <Grid container spacing={0}>
      <Grid item md={5} xs={12}>
        <div className="illustration" />
      </Grid>

      <Grid item md={7} xs={12}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100%" }}
        >
          <>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              {!loading && (
                <Grid item xs={12}>
                  <LangBar
                    locales={locales}
                    selectLanguage={(languageCode) => setLocale(languageCode)}
                    current={locale}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <h1 className="text-alpha">
                  <FormattedMessage id="landing.content.header" />
                </h1>
              </Grid>

              <Grid item xs={12}>
                <h3 className="text-alpha">
                  <FormattedMessage id="landing.content.body" />
                </h3>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Link to="/request">
                <CustomButton
                  titleId="landing.buttons.request"
                  modifier="primary"
                />
              </Link>

              <Link to="/app">
                <CustomButton
                  titleId="landing.buttons.offer"
                  modifier="secondary"
                />
              </Link>
            </Grid>
          </>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Intro;
