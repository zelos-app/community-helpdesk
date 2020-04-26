import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { FormattedMessage } from "react-intl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import history from "../../utils/history";

export default function Register() {
  let { token } = useParams();

  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.password) {
              errors.password = "required";
            }

            return errors;
          }}
          onSubmit={async (values, formik) => {
            await axios.put(`/api/auth/register/${token}`, values);
            formik.setSubmitting(false);
            formik.resetForm();
            history.push("/auth");
          }}
          isInitialValid={false}
        >
          <Form>
            <div className="input-container">
              <Field
                name="firstName"
                className="input"
                style={{ width: "100%" }}
                as={TextField}
                label={<FormattedMessage id="firstName" />}
                modifier="primary"
                variant="outlined"
              />
              <Field
                name="lastName"
                className="input"
                style={{ width: "100%" }}
                as={TextField}
                label={<FormattedMessage id="lastName" />}
                modifier="primary"
                variant="outlined"
              />
              <Field
                name="password"
                className="input"
                style={{ width: "100%" }}
                as={TextField}
                label={<FormattedMessage id="password" />}
                modifier="primary"
                variant="outlined"
                type="password"
                required
              />
            </div>

            <div className="action-wrapper">
              <Field>
                {({ form }) =>
                  form.isSubmitting ? (
                    <LoadingSpinner />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!form.isValid}
                    >
                      <FormattedMessage id="register" />
                    </Button>
                  )
                }
              </Field>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
