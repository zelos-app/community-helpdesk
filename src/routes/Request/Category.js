import React, { useContext } from "react";
import { useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import { RequestOptionsContext } from "./RequestWrapper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "center",
  },
}));

function Category() {
  const classes = useStyles();

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
      <Grid item md={5} xs={12}>
        <div className="illustration" />
      </Grid>

      <Grid item md={7} xs={12}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100%" }}
        >
          {/* <Box m={2}> */}
            <h1 className="text-alpha">
              <FormattedMessage id="selectCategory.content.header" />
            </h1>

            <h3 className="text-alpha">
              <FormattedMessage
                id="selectCategory.content.body"
                values={{ p: (...chunks) => <p>{chunks}</p> }}
              />
            </h3>

            <Grid container direction="row" justify="center" spacing={2}>
              <SelectorButtons />
            </Grid>

            <Grid container direction="row" justify="center" spacing={0}>
              <Box pt={1}>
                <FormattedMessage id="selectCategory.content.or" />
              </Box>
            </Grid>

            <Grid container direction="row" justify="center" spacing={0}>
              <Button onClick={() => history.push("/")}>
                <FormattedMessage id="selectCategory.buttons.back" />
              </Button>
            </Grid>
          {/* </Box> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Category;
