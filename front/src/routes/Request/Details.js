import React, { useState, useContext, useEffect } from "react";
import { Field, useFormikContext } from "formik";
import axios from "../../utils/axios";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { RequestOptionsContext } from "./RequestWrapper";

function Details() {
  const { categories, areas } = useContext(RequestOptionsContext);
  const { values, isValid, isSubmitting } = useFormikContext();

  useEffect(() => {
    if (!values.request) {
      history.replace("/request/request");
    }
  }, []);

  const selectedCategory = categories.find((c) => c._id === values.category);

  return (
    <div className="request-children details">
      <div className="request-children-wrapper">
        <div className="text-wrapper">
          <h1 className="text-alpha">
            <FormattedMessage id="enterYourDetails" />
          </h1>
        </div>

        <div className="input-container">
          <Field
            name="name"
            as={CustomInput}
            labelId="fullName"
            modifier="secondary"
            required
          />
          <Field
            name="phone"
            as={CustomInput}
            labelId="phone"
            modifier="secondary"
            required
          />
          {selectedCategory && selectedCategory.needsAddress && (
            <Field
              name="address"
              as={CustomInput}
              labelId="address"
              modifier="secondary"
            />
          )}
          <Field
            name="area"
            as={CustomInput}
            labelId="area"
            layout="select"
            modifier="secondary"
            required
          >
            <option></option>
            {areas.map((area) => (
              <option value={area._id} key={area._id}>
                {area.name}
              </option>
            ))}
          </Field>
        </div>

        <div className="action-wrapper">
          {isSubmitting ? (
            <LoadingSpinner />
          ) : (
            <CustomButton
              titleId="next"
              modifier="primary"
              type="submit"
              disabled={!isValid}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
