import React from "react";
import { Formik, Field, Form } from "formik";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import axios from "../../utils/axios";

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

export const AreaEditModal = ({ data, deleteArea, areaEdited }) => {
  const { action, selected: area } = data;
  const handleDelete = () => {
    deleteArea(area);
    areaEdited();
  };

  return (
    <Dialog
      onClose={() => areaEdited()}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={() => areaEdited()}>
        {`${action === "edit" ? "Edit" : "New"} Area`}
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{
            name: area?.name || "",
          }}
          onSubmit={async (values, formik) => {
            try {
              if (action === "add") {
                await axios.post("/api/areas/", values);
              } else {
                await axios.put(`/api/areas/${area._id}`, values);
              }
              formik.setSubmitting(false);
              areaEdited();
            } catch (e) {
              alert(e.message);
            }
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "required";
            }
            return errors;
          }}
        >
          <Form>
            <div className="input-container">
              <Field
                name="name"
                as={CustomInput}
                labelId="name"
                layout="input"
              />
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
                onClick={() => areaEdited()}
              />
              {action === "edit" ? (
                <CustomButton
                  titleId="delete"
                  modifier="secondary"
                  type="button"
                  onClick={() => handleDelete()}
                />
              ) : (
                <div />
              )}
            </div>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
