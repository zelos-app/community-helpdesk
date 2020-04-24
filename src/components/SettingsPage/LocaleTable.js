import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper } from "@material-ui/core";
import { NewLocaleModal } from "./newLocaleModal";
import Typography from "@material-ui/core/Typography";

import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "8 0 8 0",
    elevation: 0,
  },
  margin: {
    margin:  theme.spacing(1),
    float: "left",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  wapper: {
    padding: "24px",
    backgroundColor: "#f5f5f5",
  },
  newcategory: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: "10px",
  },
}));

const languages = [
  { id: "en", name: "English" },
  { id: "et", name: "Estonian" },
];

export const LocaleTable = () => {
  const classes = useStyles();

  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [locales, setLocales] = useState(null);
  const [localeModal, setLocaleModal] = useState(null);

  const getLocales = async () => {
    const { data = {} } = await axios.get("/api/locales");
    console.log("---dapi", data);
    setLocales(data || []);
  };

  useEffect(() => {
    getLocales();
  }, []);

  const createLocale = () => {
    console.log("===creat elocales");
  };

  const openLocaleModal = () => {
    const langList = languages.map(lang => lang.id);
    setLocaleModal(langList);
  };

  const saveNewLocale = (newLocale) => {
    console.log("newlocale", newLocale);
    setLocaleModal(null);
  };

  const setActiveLanguage = (lang) => {
    setDefaultLanguage(lang);
  };

  return (
    <>
      <Grid container spacing={0} justify="space-between">
        <Grid item xs={6}>
          <Box m={2}>
            {languages.map((lang) => (
              <Button
                variant={lang.id === defaultLanguage ? "contained" : "outlined"}
                size="small"
                color="primary"
                className={classes.margin}
                key={lang.id}
                onClick={() => setActiveLanguage(lang.id)}
              >
                {lang.name}
              </Button>
            ))}

            <IconButton
              aria-label="delete"
              onClick={() => openLocaleModal()}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={6} style={{flexBasis: "auto"}}>
          <Box m={2}>
            <Switch
              color="primary"
              name="newlocale"
              className={classes.margin}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.margin}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
      {locales ? (
        <div className={classes.wapper}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                Page/Location
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                  <Box m={2}>
                    <TextField
                      id="outlined-basic"
                      label={<FormattedMessage id="locale.field.name" />}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  </Box>
                  <Box m={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label={<FormattedMessage id="locale.field.value" />}
                      multiline
                      rows={4}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                    />
                  </Box>
                </form>
              </Paper>
            </Grid>
          </Grid>

          {localeModal && (
            <NewLocaleModal data={localeModal} saveNewLocale={saveNewLocale} />
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};
