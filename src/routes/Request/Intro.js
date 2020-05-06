import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { LangBar } from "../../components/Bar";
import useLocale, { setLocale } from "../../hooks/useLocale";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Intro = () => {
  const classes = useStyles();
  const [{ locale, locales, loading }] = useLocale();

  return (
    <Grid container spacing={0}>
      <Grid item md={5} xs={12}>
        <div className="illustration" />
      </Grid>

      <Grid item md={7} xs={12}>
        <Box p={2} style={{ height: "100%" }}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "100%" }}
          >
            {!loading && (
              <Box p={2}>
                <LangBar
                  locales={locales}
                  selectLanguage={(languageCode) => setLocale(languageCode)}
                  current={locale}
                />
              </Box>
            )}

            <h1 className="text-alpha">
              <FormattedMessage id="landing.content.header" />
            </h1>

            <h3 className="text-alpha">
              <FormattedMessage id="landing.content.body" />
            </h3>

            <div className={classes.root}>
              <Link to="/request">
                <CustomButton
                  titleId="landing.buttons.request"
                  modifier="primary"
                />
              </Link>

              {/* <Link to="/app">
                <CustomButton
                  titleId="landing.buttons.offer"
                  modifier="secondary"
                />
              </Link> */}
            </div>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Intro;
