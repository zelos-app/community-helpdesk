import React, { useState, useContext, useEffect, Fragment } from "react";
import { Field, useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";
import history from "../../utils/history";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ReactComponent as Illustration } from "../../assets/illustration.svg";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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

  function back() {
    history.go(-1);
  }

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
              <FormattedMessage id="enterYourDetails" />
            </h1>
          </div>

          <div className="input-container">
            <Field
              name="name"
              style={{ width: '100%' }}
              className="input"
              as={TextField}
              label={<FormattedMessage id="fullName" />}
              modifier="secondary"
              variant="outlined"
              required
            />
            <Field
              name="phone"
              style={{ width: '100%' }}
              className="input"
              as={TextField}
              label={<FormattedMessage id="phone" />}
              modifier="secondary"
              variant="outlined"
              required
            />
            {selectedCategory && selectedCategory.needsAddress && (
              <Field
                name="address"
                style={{ width: '100%' }}
                className="input"
                as={TextField}
                label={<FormattedMessage id="address" />}
                modifier="secondary"
                variant="outlined"
              />
            )}
            <Field
              name="area"
              as={FormControl}
              style={{ width: '100%' }}
              className="input"
              label={<FormattedMessage id="area" />}
              layout="select"
              modifier="secondary"
              variant="outlined"
              required
            >
              <InputLabel id="demo-simple-select-outlined-label">
                <FormattedMessage id="area" />
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="area"
                label={<FormattedMessage id="area" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {areas.map((area) => (
                  <MenuItem value={area._id} key={area._id}>
                    {area.name}
                  </MenuItem>
                ))}
              </Select>
            </Field>
          </div>

          <div className="action-wrapper">
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <Fragment>
                <Button
                  variant="contained"
                  color="default"
                  onClick={back}
                  type="button"
                >
                  <FormattedMessage id="goBack" />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
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
