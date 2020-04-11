import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useFormikContext, Field } from "formik";
import history from "../../utils/history";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function Request() {
  const { values } = useFormikContext();

  useEffect(() => {
    if (!values.category) {
      history.replace("/request/category");
    }
  }, []);

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
      <Grid item xs={7}>
        <div className="request-children-wrapper">
          <div className="text-wrapper">
            <h1>
              <FormattedMessage id="pleaseDescribeYourProblem" />
            </h1>
          </div>

          <Field
            name="request"
            style={{ width: '100%', marginTop: 24 }}
            as={TextField}
            label={<FormattedMessage id="describeYourRequest" />}
            multiline
            rows="5"
            modifier="primary"
            required
            variant="outlined"
          />

          <div className="action-wrapper">
            <Button
              variant="contained"
              color="default"
              onClick={back}
            >
              <FormattedMessage id="goBack" />
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={next}
              disabled={!values.request}
            >
              <FormattedMessage id="next" />
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Request;
