import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Switch, FormControlLabel } from "@material-ui/core";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Paper } from "@material-ui/core";
import { NewLocaleModal } from "./newLocaleModal";
import Typography from "@material-ui/core/Typography";
import langmap from "langmap";
import { Formik, Form, Field } from "formik";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "8 0 8 0",
    elevation: 0,
  },
  margin: {
    margin: theme.spacing(1),
    float: "left",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  wrapper: {
    padding: "24px",
    backgroundColor: "#f5f5f5",
  },
  newcategory: {
    display: "flex",
    flexDirection: "row-reverse",
    marginTop: "10px",
  },
}));

export default () => {
  const classes = useStyles();
  const [locales, setLocales] = useState([]);

  const [activeLanguage, setActiveLanguage] = useState(0);
  const [localeModal, setLocaleModal] = useState(null);

  const currentLanguage = locales[activeLanguage];

  const getLocales = async () => {
    setLocales([]);
    const { data = {} } = await axios.get("/api/locales");
    setLocales(data || {});
  };

  useEffect(() => {
    getLocales();
  }, []);

  const openLocaleModal = () => {
    const langList = locales.map((lang) => lang.code);
    setLocaleModal(langList);
  };

  const createLocale = async (localeCode) => {
    try {
      await axios.post("/api/locales", {
        code: localeCode,
        name: langmap[localeCode].englishName,
      });
      getLocales();
    } catch (error) {
      window.alert(error.message);
    }
    setLocaleModal(null);
  };

  const setCurrentLanguageActive = async (value) => {
    await axios.put(`/api/locales/${currentLanguage._id}`, {
      active: value,
    });
    getLocales();
  };

  return locales.length ? (
    <Formik
      key={currentLanguage._id}
      initialValues={currentLanguage}
      onSubmit={async (values) => {
        const updateValues = {};

        Object.keys(values).forEach((k) => {
          if (typeof values[k] === "object") {
            updateValues[k] = values[k];
          }
        });

        await axios.put(`/api/locales/${values._id}`, updateValues);
        getLocales();
      }}
    >
      <Form>
        <Grid container spacing={0} justify="space-between">
          <Grid item xs={6}>
            <Box m={2}>
              {locales.map((lang, i) => (
                <Button
                  variant={i === activeLanguage ? "contained" : "outlined"}
                  size="small"
                  color="primary"
                  type="button"
                  className={classes.margin}
                  key={lang._id}
                  onClick={() => setActiveLanguage(i)}
                >
                  {lang.name}
                </Button>
              ))}

              <IconButton
                aria-label="Add"
                onClick={() => openLocaleModal()}
                type="button"
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} style={{ flexBasis: "auto" }}>
            <Box m={2}>
              <FormControlLabel
                labelPlacement="start"
                label="Active"
                control={
                  <Switch
                    color="primary"
                    name="newlocale"
                    className={classes.margin}
                    checked={currentLanguage.active}
                    onChange={() =>
                      setCurrentLanguageActive(!currentLanguage.active)
                    }
                  />
                }
              />
              <Button
                variant="contained"
                color="secondary"
                className={classes.margin}
                type="submit"
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
        <div className={classes.wrapper}>
          {Object.keys(currentLanguage).map((key) => {
            if (typeof currentLanguage[key] !== "object") return null;

            return (
              <React.Fragment key={key}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography gutterBottom variant="h4">
                      {key}
                    </Typography>
                  </Grid>
                </Grid>
                {Object.keys(currentLanguage[key]).map((subkey) => {
                  return (
                    <React.Fragment key={`${key}.${subkey}`}>
                      <Grid container alignItems="center">
                        <Grid item xs>
                          <Typography gutterBottom variant="h5">
                            {subkey}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Paper className={classes.paper}>
                            {Object.keys(currentLanguage[key][subkey]).map(
                              (field, idx) => {
                                return (
                                  <Box m={2} key={`${key}.${subkey}.${idx}`}>
                                    <Field
                                      name={`${key}.${subkey}.${field}`}
                                      as={TextField}
                                      label={field}
                                      variant="outlined"
                                      margin="normal"
                                      fullWidth
                                    />
                                  </Box>
                                );
                              }
                            )}
                          </Paper>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
        {localeModal && (
          <NewLocaleModal data={localeModal} createLocale={createLocale} />
        )}
      </Form>
    </Formik>
  ) : (
    <LoadingSpinner />
  );
};
