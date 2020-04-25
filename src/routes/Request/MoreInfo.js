import React, { useContext, Fragment } from "react";
import { Field, useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { MoreInfoRequestOptionsContext } from "./MoreInfoRequestWrapper";
import { TextField, Button, MenuItem, Grid } from "@material-ui/core";

function MoreInfo() {
  const { country } = useContext(MoreInfoRequestOptionsContext);
  const { values, isValid, isSubmitting } = useFormikContext();

  return (
    <Grid container spacing={0}>
      <Grid item xs={5}>
        <div className="illustration" />
      </Grid>
      <Grid item xs={7}>
        <div className="request-children-wrapper">
          <div className="text-wrapper">
            <h1 className="text-alpha">
              <FormattedMessage id="aboutYourself" />
            </h1>
          </div>
          <div className="input-container">
            <Grid container spacing={2} direction="column" alignItems="stretch">
              <Grid item>
                <Field
                  name="orgname"
                  as={TextField}
                  label="What is your organization called?"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Field
                  name="country"
                  as={TextField}
                  label="Where are you localted?"
                  variant="outlined"
                  value={values.country}
                  fullWidth
                  required
                  select
                >
                  <MenuItem value="" key="select-country">
                    Select Country
                  </MenuItem>
                  {country.map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item>
                <Field
                  name="name"
                  as={TextField}
                  label="Your name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Field
                  name="phone"
                  as={TextField}
                  label="Phone number"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Field
                  name="email"
                  as={TextField}
                  label="email address"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Field
                  name="website"
                  as={TextField}
                  label="website"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Field
                  name="about"
                  as={TextField}
                  label="Please tell us a bit about your cause"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          ==>=={country}
          <div className="action-wrapper">
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <Fragment>
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

export default MoreInfo;
