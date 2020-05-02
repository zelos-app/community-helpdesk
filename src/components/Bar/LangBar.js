import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexWrap: "wrap",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    "& > *": {
      backgroundColor: "white !important",
      borderRadius: 0,
    },
    "& .selected": {
      backgroundColor: `${lightBlue.A100} !important`,
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
      {locales.map(({ key, name }) => (
        <Button
          variant="contained"
          key={key}
          onClick={() => {
            selectLanguage(key);
          }}
          className={current === key ? "selected" : ""}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};
