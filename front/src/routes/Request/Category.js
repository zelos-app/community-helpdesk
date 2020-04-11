import React, { useEffect, useState, useContext } from "react";
import { useFormikContext } from "formik";
import CustomButton from "../../components/CustomButton/CustomButton";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ReactComponent as Illustration } from "../../assets/illustration.svg";
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
      <Button
        key={category._id}
        variant="contained"
        color="primary"
        onClick={() => select(category._id)}
      >
        {category.name}
      </Button>
    ));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Illustration
          style={{
            position: 'absolute',
            left: -24,
            height: 'calc(100vh - 64px)'
          }}
        />
      </Grid>
      <Grid item xs={7}>
        <div className="request-children-wrapper">
          <div className="text-wrapper">
            <h1>
              <FormattedMessage id="categoryHead" />
            </h1>
            <h3>
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
            <Button
              variant="contained"
              color="default"
              onClick={() => history.go(-1)}
            >
              <FormattedMessage id="back" />
            </Button>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Category;
