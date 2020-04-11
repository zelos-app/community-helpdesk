import React, { useEffect, useState, useContext } from "react";
import { useFormikContext } from "formik";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import { RequestOptionsContext } from "./RequestWrapper";

function Category() {
  const { categories } = useContext(RequestOptionsContext);
  const { setFieldValue } = useFormikContext();

  function select(id) {
    setFieldValue("category", id);
    history.push("/request/request");
  }

  const SelectorButtons = () => {
    return categories.map((category) => (
      <CustomButton
        key={category._id}
        title={category.name}
        modifier="secondary"
        type="button"
        onClick={() => select(category._id)}
      />
    ));
  };

  return (
    <div className="request-children category">
      <div className="request-children-wrapper">
        <div className="text-wrapper">
          <h1 className="text-alpha">
            <FormattedMessage id="categoryHead" />
          </h1>
          <h3 className="text-alpha">
            <FormattedMessage id="categoryBody" values={{p: (...chunks) => <p>{chunks}</p>}} />
          </h3>
        </div>

        <div className="action-wrapper">
          <SelectorButtons />
        </div>
        <div className="action-wrapper">
          <FormattedMessage id="or" />
        </div>
        <div className="action-wrapper">
          <CustomButton
            titleId="back"
            modifier="secondary"
            onClick={() => history.go(-1)}
          />
        </div>
      </div>
    </div>
  );
}

export default Category;
