import React, { useState, useEffect, createContext } from "react";
import { Formik, Form } from "formik";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const defaultContext = { country: [] };

export const MoreInfoRequestOptionsContext = createContext(defaultContext);

export default function MoreInfoRequestWrapper(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestOptions, setRequestOptions] = useState(defaultContext);

  useEffect(() => {
    setRequestOptions({ country: ["ET", "US"] });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="request">
      <div className="request-wrapper">
        <MoreInfoRequestOptionsContext.Provider value={requestOptions}>
          <Formik
            initialValues={{
              about: "",
              email: "",
              name: "",
              orgname: "",
              country: "Select",
              phone: "+372",
              website: "",
            }}
            onSubmit={(values, form) => {
              async function next() {
                //submit api call here
                form.resetForm();
                form.setSubmitting(false);
                history.push("/request/confirmed");
              }
              next();
            }}
            validate={(values) => {
              const errors = {};

              if (!values.orgname) {
                errors.request = "required";
              }

              if (!values.country) {
                errors.request = "required";
              }

              if (!values.name) {
                errors.name = "required";
              }

              if (!values.phone) {
                errors.phone = "required";
              }

              if (!values.email) {
                errors.phone = "required";
              }

              return errors;
            }}
          >
            <Form>{props.children}</Form>
          </Formik>
        </MoreInfoRequestOptionsContext.Provider>
      </div>
    </div>
  );
}
