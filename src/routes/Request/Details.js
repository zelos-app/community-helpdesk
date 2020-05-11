import React, { useContext, useEffect, Fragment } from "react";
import { Field, useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { RequestOptionsContext } from "./RequestWrapper";
import { TextField, Button, MenuItem, Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Details() {
  const classes = useStyles();

  const { categories, areas } = useContext(RequestOptionsContext);
  const { values, isValid, isSubmitting } = useFormikContext();

  useEffect(() => {
    if (!values.request) {
      history.replace("/request/request");
    }
  }, [values.request]);

  const selectedCategory = categories.find((c) => c._id === values.category);

  function back() {
    history.go(-1);
  }

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
          <Box m={2}>
            <h1 className="text-alpha">
              <FormattedMessage id="addContact.content.header" />
            </h1>
            <h3 className="text-alpha">
              <FormattedMessage id="addContact.content.body" />
            </h3>

            <Grid container spacing={2} direction="column" alignItems="stretch">
              <Grid item>
                <ErrorMessage name="name" />
                <Field
                  name="name"
                  as={TextField}
                  label={<FormattedMessage id="addContact.placeholders.name" />}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <ErrorMessage name="phone" />
                <Field
                  name="phone"
                  as={TextField}
                  label={
                    <FormattedMessage id="addContact.placeholders.phone" />
                  }
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              {selectedCategory && selectedCategory.needsAddress && (
                <Grid item>
                  <ErrorMessage name="address" />
                  <Field
                    name="address"
                    as={TextField}
                    label={
                      <FormattedMessage id="addContact.placeholders.address" />
                    }
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              )}
              <Grid item>
                <ErrorMessage name="area" />
                <Field
                  name="area"
                  as={TextField}
                  label={<FormattedMessage id="addContact.placeholders.area" />}
                  variant="outlined"
                  fullWidth
                  required
                  select
                >
                  {areas.map((area) => (
                    <MenuItem value={area._id} key={area._id}>
                      {area.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>

            <div className={classes.root}>
              {isSubmitting ? (
                <LoadingSpinner />
              ) : (
                <Fragment>
                  <Button type="button" variant="contained" onClick={back}>
                    <FormattedMessage id="addContact.buttons.back" />
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={!isValid}
                  >
                    <FormattedMessage id="addContact.buttons.next" />
                  </Button>
                </Fragment>
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Details;
