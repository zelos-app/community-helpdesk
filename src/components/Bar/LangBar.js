import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const LangBar = ({ locales, current, selectLanguage }) => {
  const classes = useStyles();

  if (locales.length === 1) {
    return null;
  }

  return (
    <div className={classes.root}>
      <ButtonGroup size="small" aria-label="medium button group">
        {locales.map(({ key, name }) => (
          <Button
            key={key}
            onClick={() => {
              selectLanguage(key);
            }}
            color={current === key ? "secondary" : ""}
          >
            {name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
