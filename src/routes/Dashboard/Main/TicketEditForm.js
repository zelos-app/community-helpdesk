import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { RequestOptionsContext } from "../DashboardWrapper";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles, FormHelperText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import { ErrorsHandlingHelper } from "../../../utils/errosHandling";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& .MuiTextField-root": {
        marginBottom: theme.spacing(2),
      },
      "& .MuiFormControl-root": {
        marginBottom: theme.spacing(2),
      },
    },
    ml1: {
      marginLeft: theme.spacing(1),
    },
  })
);

export const TicketEditForm = (props) => {
  const { categories, areas, users } = useContext(RequestOptionsContext);

  const classes = useStyles();
  const { ticket } = props;

  const getSelectedCategory = (ticketCategory) => {
    return categories.find((category) => ticketCategory === category._id);
  };

  return (
    <Box component="div">
      <Formik
        initialValues={ticket}
        onSubmit={async (values, formik) => {
          try {
            props.onSubmit && (await props.onSubmit({ ...ticket, ...values }));
          } catch (e) {
            if (ErrorsHandlingHelper.isValidationError(e)) {
              const errors = ErrorsHandlingHelper.errorToValidationMessages(e);
              formik.setErrors(errors);
              return;
            }

            alert(ErrorsHandlingHelper.extractMessage(e));
          }
        }}
      >
        {(fProps) => (
          <form className={classes.root} onSubmit={fProps.handleSubmit}>
            <TextField
              className="input"
              id="request"
              name="request"
              label={<FormattedMessage id="request" />}
              variant="outlined"
              rows={5}
              fullWidth
              multiline
              onChange={fProps.handleChange}
              value={fProps.values.request}
              error={!!fProps.errors?.request}
              helperText={fProps.errors.request}
            />

            <TextField
              className="input"
              id="requesterName"
              name="name"
              label={<FormattedMessage id="requesterName" />}
              variant="outlined"
              fullWidth
              onChange={fProps.handleChange}
              value={fProps.values.name}
              error={!!fProps.errors?.name}
              helperText={fProps.errors.name}
            />

            <FormControl
              className="input"
              variant="outlined"
              fullWidth
              error={!!fProps.errors?.category}
            >
              <InputLabel>
                <FormattedMessage id="category" />
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="category"
                onChange={fProps.handleChange}
                value={fProps.values.category}
                variant="outlined"
                style={{ textAlign: "left" }}
                label={<FormattedMessage id="category" />}
                error={!!fProps.errors?.category}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((option) => (
                  <MenuItem value={option._id} key={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id="component-error-text">
                {fProps.errors?.category}
              </FormHelperText>
            </FormControl>

            <TextField
              className="input"
              id="phone"
              name="phone"
              label={<FormattedMessage id="phone" />}
              variant="outlined"
              fullWidth
              onChange={fProps.handleChange}
              value={fProps.values.phone}
              error={!!fProps.errors?.phone}
              helperText={fProps.errors.phone}
            />

            {fProps.values.category &&
              getSelectedCategory(fProps.values.category) &&
              getSelectedCategory(fProps.values.category).needsAddress && (
                <TextField
                  className="input"
                  id="address"
                  name="address"
                  label={<FormattedMessage id="address" />}
                  variant="outlined"
                  fullWidth
                  onChange={fProps.handleChange}
                  value={fProps.values.address}
                  error={!!fProps.errors?.address}
                  helperText={fProps.errors.address}
                />
              )}

            <FormControl
              className="input"
              variant="outlined"
              fullWidth
              error={!!fProps.errors?.area}
            >
              <InputLabel>
                <FormattedMessage id="area" />
              </InputLabel>
              <Select
                labelId="area"
                id="area"
                name="area"
                variant="outlined"
                onChange={fProps.handleChange}
                value={fProps.values.area}
                style={{ textAlign: "left" }}
                label={<FormattedMessage id="area" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {areas.map((option) => (
                  <MenuItem value={option._id} key={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id="component-error-text">
                {fProps.errors?.area}
              </FormHelperText>
            </FormControl>

            <FormControl
              className="input"
              variant="outlined"
              fullWidth
              error={!!fProps.errors?.owner}
            >
              <InputLabel>
                <FormattedMessage id="assignee" />
              </InputLabel>
              <Select
                labelId="assignee"
                id="assignee"
                name="owner"
                variant="outlined"
                onChange={fProps.handleChange}
                value={fProps.values.owner || ""}
                style={{ textAlign: "left" }}
                label={<FormattedMessage id="assignee" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {users.map((option) => (
                  <MenuItem value={option._id} key={option._id}>
                    {option.firstName || "-"} {option.lastName || "-"}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText id="component-error-text">
                {fProps.errors?.owner}
              </FormHelperText>
            </FormControl>

            <Grid container direction="row" justify="flex-end">
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => props.onCancel && props.onCancel()}
                >
                  <FormattedMessage id="cancel" />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.ml1}
                >
                  <FormattedMessage id={!!ticket?._id ? "save" : "create"} />
                </Button>
              </Box>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};
