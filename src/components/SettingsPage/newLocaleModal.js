import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CustomButton from "../../components/CustomButton/CustomButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
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

export const NewLocaleModal = ({ data, saveNewLocale }) => {
  const [locale, setLocale] = useState();

  useEffect(() => {
    setLocale(data[0]);
  }, [data]);

  const handleInputChange = ({ target }) => {
    setLocale(target.value);
  };

  return (
    <Dialog
      onClose={() => saveNewLocale()}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={() => saveNewLocale()}>
        New Locale
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            locales: locale || [],
          }}
          onSubmit={async (values, formik) => {
            try {
              formik.setSubmitting(false);
              saveNewLocale();
            } catch (e) {
              alert(e.message);
            }
          }}
          validate={(values) => {
            const errors = {};
            if (!values.locales) {
              errors.locales = "required";
            }
            return errors;
          }}
        >
          <Form>
            <div className="inputContainer">
              <Field name="locales">
                {({ field }) => (
                  <FormControl className="input" variant="outlined" fullWidth>
                    <InputLabel>
                      <FormattedMessage id="locales" />
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      name="Locales"
                      variant="outlined"
                      value={locale}
                      onChange={handleInputChange}
                      label={<FormattedMessage id="locales" />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {data.map((option) => (
                        <MenuItem value={option} key={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
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
                onClick={() => saveNewLocale()}
              />
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
