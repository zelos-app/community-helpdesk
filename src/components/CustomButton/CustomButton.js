import React from "react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { lightBlue, lightGreen } from "@material-ui/core/colors";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: lightBlue,
  },
});

export default (props) => {
  const { modifier = "primary", titleId = "", title = "", ...rest } = props;

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color={modifier}
        className={classes.margin}
        {...rest}
      >
        {titleId === "" ? title : <FormattedMessage id={titleId} />}
      </Button>
    </ThemeProvider>
  );
};
