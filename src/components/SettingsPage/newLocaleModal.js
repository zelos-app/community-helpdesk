import React from "react";
import { Formik, Field, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CustomButton from "../../components/CustomButton/CustomButton";
import langmap from "langmap";
import { FormattedMessage } from "react-intl";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export const NewLocaleModal = ({ createLocale }) => {
  return (
    <Dialog aria-labelledby="customized-dialog-title" open={true}>
      <DialogTitle id="customized-dialog-title">New Locale</DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            locale: "",
          }}
          onSubmit={(values, formik) => {
            createLocale(values.locale);
          }}
          validate={(values) => {
            const errors = {};
            if (!values.locale) {
              errors.locale = "required";
            }
            return errors;
          }}
        >
          <Form>
            <div className="inputContainer">
              <Field
                name="locale"
                as={TextField}
                label={<FormattedMessage id="locales" />}
                variant="outlined"
                fullWidth
                required
                select
              >
                {Object.keys(langmap).map((code) => (
                  <MenuItem value={code} key={code}>
                    {langmap[code].englishName}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="category-action">
              <Field>
                {({ form }) => (
                  <CustomButton
                    titleId="save"
                    modifier="primary"
                    type="submit"
                    disabled={form.isSubmitting || !form.isValid}
                  />
                )}
              </Field>
              <CustomButton
                titleId="cancel"
                modifier="secondary"
                type="button"
              />
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
