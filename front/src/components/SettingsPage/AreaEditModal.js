import React from "react";
import { Formik, Field, Form } from "formik";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import axios from "../../utils/axios";


export const AreaEditModal = ({ area, selectedAreaEdited }) => {
    return (
        <div className="modal">
            <div className="modal__content">
                <Formik
                    initialValues={{
                        name:  area.name ,
                    }}
                    onSubmit={async (values, formik) => {
                        try {
                            await axios.put(`/api/areas/${area._id}`, values);

                            formik.setSubmitting(false);
                            selectedAreaEdited();
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
                        </div>
                        <div className="action-wrapper">
                            <Field>
                                {({ form }) => (
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
                                onClick={() => selectedAreaEdited()}
                            />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
