import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import React from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
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
                as={CustomInput}
                labelId="firstName"
                modifier="primary"
              />
              <Field
                name="lastName"
                as={CustomInput}
                labelId="lastName"
                modifier="primary"
              />
              <Field
                name="password"
                as={CustomInput}
                labelId="password"
                modifier="primary"
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
                    <CustomButton
                      titleId="register"
                      modifier="primary"
                      disabled={!form.isValid}
                    />
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
