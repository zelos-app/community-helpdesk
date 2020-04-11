import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useFormikContext, Field, Form } from "formik";
import history from "../../utils/history";
import { TextField, Button } from "@material-ui/core";

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
    <div className="request-children request">
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
    </div>
  );
}

export default Request;
