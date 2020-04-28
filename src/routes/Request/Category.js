import React, { useContext } from "react";
import { useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import { RequestOptionsContext } from "./RequestWrapper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function Category() {
  const { categories } = useContext(RequestOptionsContext);
  const { setFieldValue } = useFormikContext();

  function select(id) {
    setFieldValue("category", id);
    history.push("/request/request");
  }

  const SelectorButtons = () => {
    return categories.map((category) => (
      <Grid item key={category._id}>
        <Button
          key={category._id}
          onClick={() => select(category._id)}
          variant="contained"
          size="large"
        >
          {category.name}
        </Button>
      </Grid>
    ));
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={5}>
        <div className="illustration" />
      </Grid>
      <Grid item xs={7}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <div className="request-children-wrapper">
            <div className="text-wrapper">
              <h1 className="text-alpha">
                <FormattedMessage id="selectCategory.content.header" />
              </h1>
              <h3 className="text-alpha">
                <FormattedMessage
                  id="selectCategory.content.body"
                  values={{ p: (...chunks) => <p>{chunks}</p> }}
                />
              </h3>
            </div>

            <Grid container direction="row" justify="center" spacing={2}>
              <SelectorButtons />
            </Grid>
            <div className="action-wrapper">
              <FormattedMessage id="selectCategory.content.or" />
            </div>
            <div className="action-wrapper">
              <Button onClick={() => history.go(-1)}>
                <FormattedMessage id="selectCategory.buttons.back" />
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Category;
