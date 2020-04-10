import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useFormikContext, Field } from "formik";
import history from "../../utils/history";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

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
          as={CustomInput}
          labelId="describeYourRequest"
          layout="textarea"
          rows="5"
          modifier="primary"
          required
        />

        <div className="action-wrapper">
          <CustomButton
            titleId="goBack"
            modifier="secondary"
            type="button"
            onClick={back}
          />
          <CustomButton
            titleId="next"
            modifier="primary"
            onClick={next}
            type="button"
            disabled={!values.request}
          />
        </div>
      </div>
    </div>
  );
}

export default Request;
