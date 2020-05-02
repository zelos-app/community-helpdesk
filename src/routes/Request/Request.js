import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormikContext, Field } from "formik";
import history from "../../utils/history";
import { TextField, Button, Grid } from "@material-ui/core";
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

function Request() {
  const classes = useStyles();

  const { values } = useFormikContext();
  const intl = useIntl();

  useEffect(() => {
    if (!values.category) {
      history.replace("/request/category");
    }
  }, [values.category]);

  function next() {
    history.push("/request/details");
  }

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
              <FormattedMessage id="writeRequest.content.header" />
            </h1>

            <Field
              name="request"
              as={TextField}
              label={<FormattedMessage id="writeRequest.content.body" />}
              placeholder={intl.formatMessage({
                id: "writeRequest.placeholders.request",
              })}
              variant="outlined"
              multiline
              rows="5"
              required
              fullWidth
            />

            <div className={classes.root}>
              <Button type="button" onClick={back} variant="contained">
                <FormattedMessage id="writeRequest.buttons.back" />
              </Button>
              <Button
                color="primary"
                onClick={next}
                type="button"
                disabled={!values.request}
                variant="contained"
              >
                <FormattedMessage id="writeRequest.buttons.next" />
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Request;
