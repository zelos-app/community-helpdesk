import React from "react";
import {Formik, Field, Form} from "formik";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import axios from "../../utils/axios";


export const CategoryEditModal = ({category, selectedCategoryEdited}) => {
  return (
      <div className="modal">
        <div className="modal__content">
          <Formik
              initialValues={{
                name: category.name,
                description: category.description || "",
                needsAddress: category.needsAddress,
              }}
              onSubmit={async (values, formik) => {
                try {
                  await axios.put(`/api/categories/${category._id}`, values);

                  formik.setSubmitting(false);
                  selectedCategoryEdited();
                } catch (e) {
                  alert(e.message);
                }
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "required";
                }
                return errors;
              }}
          >
            <Form>
              <div className="input-container">
                <Field
                    name="name"
                    as={CustomInput}
                    labelId="Name"
                    layout="input"
                />
                <Field
                    name="description"
                    as={CustomInput}
                    labelId="Description"
                    layout="input"
                />

                <Field name="needsAddress">
                  {({field}) => (
                      <CustomInput
                          name={field.name}
                          labelId="address needed"
                          layout="checkbox"
                          modifier="secondary"
                          checked={field.value}
                          {...field}
                      />
                  )}
                </Field>

              </div>
              <div className="action-wrapper">
                <Field>
                  {({form}) => (
                      <CustomButton
                          titleId="Save"
                          modifier="primary"
                          type="submit"
                          disabled={form.isSubmitting || !form.isValid}
                      />
                  )}
                </Field>
                <CustomButton
                    titleId="Cancel"
                    modifier="secondary"
                    type="button"
                    onClick={() => selectedCategoryEdited()}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
  );
};
