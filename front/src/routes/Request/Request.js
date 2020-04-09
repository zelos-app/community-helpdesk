import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { requestStore } from "../../store";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

function Request() {
  const history = useHistory();

  function next() {
    history.push("/details");
  }

  function handleInputChange({ target }) {
    requestStore.request = target.value;
  }

  return (
    <div className="request-children request">
      <div className="request-children-wrapper">
        <div className="text-wrapper">
          <h1 className="text-alpha">
            <FormattedMessage id="pleaseDescribeYourProblem" />
          </h1>
        </div>

        <CustomInput
          labelId="describeYourRequest"
          layout="textarea"
          rows="5"
          modifier="primary"
          onChange={handleInputChange}
        />

        <div className="action-wrapper">
          <CustomButton titleId="next" modifier="primary" onClick={next} />
        </div>
      </div>
    </div>
  );
}

export default Request;
