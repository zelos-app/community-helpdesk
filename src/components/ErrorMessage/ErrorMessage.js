import React, { Fragment } from "react";
import { ErrorMessage } from "formik";
import ErrorMessageStyle from "./ErrorMessageStyle";

export default function CustomErrorMessage(props) {
  return (
    <Fragment>
      <ErrorMessageStyle />
      <p className="error-message">
        <ErrorMessage {...props} />
      </p>
    </Fragment>
  );
}
