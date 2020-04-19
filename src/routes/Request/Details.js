import React, { useContext, useEffect, Fragment } from "react";
import { Field, useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { RequestOptionsContext } from "./RequestWrapper";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from "@material-ui/core";

function Details() {
  const { categories, areas } = useContext(RequestOptionsContext);
  const { values, isValid, isSubmitting } = useFormikContext();

  useEffect(() => {
    if (!values.request) {
      history.replace("/request/request");
    }
  }, [values.request]);

  const selectedCategory = categories.find((c) => c._id === values.category);

  function back() {
    history.go(-1);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={5}>
        <div className="illustration" />
      </Grid>
      <Grid item xs={7}>
        <div className="request-children-wrapper">
          <div className="text-wrapper">
            <h1 className="text-alpha">
              <FormattedMessage id="enterYourDetails" />
            </h1>
          </div>

          <div className="input-container">
            <Grid container spacing={2} direction="column" alignItems="stretch">
              <Grid item>
                <Field
                  name="name"
                  as={TextField}
                  label={<FormattedMessage id="fullName" />}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Field
                  name="phone"
                  as={TextField}
                  label={<FormattedMessage id="phone" />}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              {selectedCategory && selectedCategory.needsAddress && (
                <Grid item>
                  <Field
                    name="address"
                    as={TextField}
                    label={<FormattedMessage id="address" />}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              )}
              <Grid item>
                <Field
                  name="area"
                  as={TextField}
                  label={<FormattedMessage id="area" />}
                  variant="outlined"
                  fullWidth
                  required
                  select
                >
                  {areas.map((area) => (
                    <MenuItem value={area._id} key={area._id}>
                      {area.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
            </Grid>
          </div>

          <div className="action-wrapper">
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <Fragment>
                <Button type="button" variant="contained" onClick={back}>
                  <FormattedMessage id="goBack" />
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={!isValid}
                >
                  <FormattedMessage id="next" />
                </Button>
              </Fragment>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default Details;
