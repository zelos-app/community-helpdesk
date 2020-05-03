import React from "react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { lightBlue, lightGreen } from "@material-ui/core/colors";
import { FormattedMessage } from "react-intl";

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: lightBlue,
  },
});

export default (props) => {
  const {
    children,
    modifier = "primary",
    titleId = "",
    title = "",
    ...rest
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color={modifier} {...rest}>
        {children}
        {titleId === "" ? title : <FormattedMessage id={titleId} />}
      </Button>
    </ThemeProvider>
  );
};
