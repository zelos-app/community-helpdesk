import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    right: "10px",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const LangBar = ({ langs, selectLanguage }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup size="small" aria-label="small outlined button group">
        {langs.map((lang) => (
          <Button
            key={lang}
            onClick={() => {
              selectLanguage(lang);
            }}
          >
            {lang}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
