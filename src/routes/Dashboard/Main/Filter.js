import React from "react";
import { setActiveFilter, useTickets } from "../../../hooks/useTickets";
import { Checkbox, createStyles, FormControlLabel } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

export const Filter = () => {
  const classes = useStyles();
  const [{ activeFilter }] = useTickets();

  const filterKeys = [
    "rejected",
    "approved",
    "resolved",
    "archived",
    "notified",
  ];

  const filterChanged = async ({ target }) => {
    setActiveFilter({
      ...activeFilter,
      [target.value]: target.checked,
    });
  };

  const checkBox = (filter, idx) => {
    return (
      <Checkbox
        color="primary"
        key={idx}
        onChange={filterChanged}
        checked={activeFilter[filter]}
      />
    );
  };

  const FormLabel = (props) => <Typography variant="h5" {...props} />;
  const translateLabel = (label) => <FormattedMessage id={`filter.${label}`} />;

  return (
    <>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component={FormLabel}>
            <FormattedMessage id="filters" />
          </FormLabel>
          <FormGroup row>
            {filterKeys.map((filter, idx) => (
              <FormControlLabel
                key={idx}
                value={filter}
                control={checkBox(filter, idx)}
                label={translateLabel(filter)}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
};
