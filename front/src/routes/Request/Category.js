import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import { requestStore } from "../../store";
import { RequestOptionsContext } from "./RequestWrapper";

function Category() {
  const { categories } = useContext(RequestOptionsContext);

  function select(id) {
    requestStore.category = id;
    history.push("/request/request");
  }

  const SelectorButtons = () => {
    return categories.map((category) => (
      <CustomButton
        key={category._id}
        title={category.name}
        modifier="secondary"
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
            <FormattedMessage id="categoryBody" />
          </h3>
        </div>

        <div className="action-wrapper">
          <SelectorButtons />
        </div>
      </div>
    </div>
  );
}

export default Category;
