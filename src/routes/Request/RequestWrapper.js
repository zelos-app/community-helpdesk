import React, { useState, useEffect, createContext } from "react";
import { Formik, Form } from "formik";
import axios from "../../utils/axios";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const defaultContext = { categories: [], areas: [] };

export const RequestOptionsContext = createContext(defaultContext);

export default function RequestWrapper(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestOptions, setRequestOptions] = useState(defaultContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { categories, areas },
        } = await axios.get("/api/submit");

        setRequestOptions({ categories, areas });

        setIsLoaded(true);
      } catch (e) {
        alert(e.message);
      }
    }
    fetchData();
  }, []);

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <div className="request">
      <div className="request-wrapper">
        <RequestOptionsContext.Provider value={requestOptions}>
          <Formik
            initialValues={{
              phone: "+372",
            }}
            onSubmit={(values, form) => {
              async function next() {
                await axios.post("/api/submit", { ...values });
                form.resetForm();
                form.setSubmitting(false);
                history.push("/request/confirmed");
              }
              next();
            }}
            validate={(values) => {
              const errors = {};

              if (!values.request) {
                errors.request = "required";
              }

              if (!values.name) {
                errors.name = "required";
              }

              if (!values.phone) {
                errors.phone = "required";
              }

              const selectedCategory = requestOptions.categories.find(
                (c) => c._id === values.category
              );

              if (
                selectedCategory &&
                selectedCategory.needsAddress &&
                !values.address
              ) {
                errors.address = "required";
              }

              if (!values.area) {
                errors.area = "required";
              }

              return errors;
            }}
          >
            <Form>{props.children}</Form>
          </Formik>
        </RequestOptionsContext.Provider>
      </div>
    </div>
  );
}
