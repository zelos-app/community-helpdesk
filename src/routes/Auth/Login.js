import isEmail from "isemail";
import React, { useContext } from "react";
import { Formik } from "formik";
import { login, LoggedInContext } from "../../utils/auth";
import { FormattedMessage } from "react-intl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Login() {
  const { set } = useContext(LoggedInContext);
  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (!isEmail.validate(values.email)) {
              errors.email = "Bad";
            }

            if (!values.password) {
              errors.password = "Required";
            }

            return errors;
          }}
          onSubmit={async (values, formik) => {
            try {
              await login(values.email, values.password);
              set(true);
            } finally {
              formik.setSubmitting(false);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="input-container">
                <TextField
                  style={{ width: "100%" }}
                  className="input"
                  id="email"
                  name="email"
                  label={<FormattedMessage id="email" />}
                  variant="outlined"
                  value={props.values.email}
                  onChange={props.handleChange}
                  required
                />
                <TextField
                  style={{ width: "100%" }}
                  className="input"
                  id="password"
                  name="password"
                  label={<FormattedMessage id="password" />}
                  variant="outlined"
                  type="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  required
                />
              </div>
              <div className="action-wrapper">
                <Button variant="contained" color="primary" type="submit">
                  <FormattedMessage id="login" />
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
