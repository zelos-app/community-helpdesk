import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useFormikContext, Field } from "formik";
import history from "../../utils/history";
import { TextField, Button, Grid } from "@material-ui/core";

function Request() {
  const { values } = useFormikContext();

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
                <FormattedMessage id="pleaseDescribeYourProblem" />
              </h1>
            </div>

            <Field
              name="request"
              as={TextField}
              label={<FormattedMessage id="describeYourRequest" />}
              variant="outlined"
              multiline
              rows="5"
              required
              fullWidth
            />

            <div className="action-wrapper">
              <Button type="button" onClick={back} variant="contained">
                <FormattedMessage id="goBack" />
              </Button>
              <Button
                color="primary"
                onClick={next}
                type="button"
                disabled={!values.request}
                variant="contained"
              >
                <FormattedMessage id="next" />
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Request;
