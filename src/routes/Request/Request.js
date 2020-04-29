import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useFormikContext, Field } from "formik";
import history from "../../utils/history";
import { TextField, Button, Grid } from "@material-ui/core";

function Request() {
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
      <Grid item xs={5}>
        <div className="illustration" />
      </Grid>
      <Grid item xs={7} className="right-block">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <div className="request-children-wrapper">
            <div className="text-wrapper">
              <h1 className="text-alpha">
                <FormattedMessage id="writeRequest.content.header" />
              </h1>
            </div>

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

            <div className="action-wrapper">
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
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Request;
