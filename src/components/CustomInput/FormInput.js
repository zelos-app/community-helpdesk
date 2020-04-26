import React from "react";
import { FormattedMessage } from "react-intl";
import TextField from "@material-ui/core/TextField";
import { Field } from "formik";

export default ({ label = "", name = "", ...rest }) => {
  return (
    <Field
      className={"mb-20"}
      name={name}
      as={TextField}
      fullWidth
      label={<FormattedMessage id={label} />}
      {...rest}
    />
  );
};
