import React, { useState } from "react";
import { filterInitialState, setActiveFilter } from "../../../hooks/useTickets";
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
      justifyContent: "space-between",
    },
    label: {
      padding: "10px 20px",
    },
  })
);

export const Filter = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState(filterInitialState);

  const filterKeys = [
    "rejected",
    "accepted",
    "resolved",
    "notified",
    // "archived"
  ];

  const filterChanged = async ({ target }) => {
    setActiveFilter({
      ...filter,
      [target.value]: target.checked,
    });

    setFilter({ ...filter, [target.value]: target.checked });
  };

  const checkBox = (filter) => {
    return (
      <Checkbox
        color="primary"
        size="small"
        onChange={filterChanged}
        checked={filter[filter]}
      />
    );
  };

  const Label = (props) => (
    <Typography variant="h5" className={classes.label} {...props} />
  );
  const translateLabel = (label) => <FormattedMessage id={`filter.${label}`} />;

  return (
    <>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormGroup row>
            <Label component={FormLabel}>
              <FormattedMessage id="filters" />
            </Label>
            {filterKeys.map((filter, idx) => (
              <FormControlLabel
                key={idx}
                value={filter}
                control={checkBox(filter)}
                label={translateLabel(filter)}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
};
