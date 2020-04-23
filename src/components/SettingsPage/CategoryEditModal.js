import React from "react";
import { Formik, Field, Form } from "formik";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import axios from "../../utils/axios";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
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
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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


export const CategoryEditModal = ({ data, deleteCategory, selectedCategoryEdited }) => {
  const { action, selected: category } = data;
  
  const handleDelete = () => {
    deleteCategory(category);
    selectedCategoryEdited();
  }
 
  return (
    <Dialog onClose={() => selectedCategoryEdited()} aria-labelledby="customized-dialog-title" open={true}>
    <DialogTitle id="customized-dialog-title" onClose={() => selectedCategoryEdited()}>
      {`${action === 'edit' ? 'Edit' : 'New'} Category`}
    </DialogTitle>
    <DialogContent dividers>
        <Formik
          initialValues={{
            name: category?.name || "",
            description: category?.description || "",
            needsAddress: category?.needsAddress || "'",
          }}
          onSubmit={async (values, formik) => {
            try {
              if (action === "add") {
                await axios.post("/api/categories/", values);
                
              } else {
                await axios.put(`/api/categories/${category._id}`, values);
              }

              formik.setSubmitting(false);
              selectedCategoryEdited();
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
            <div className="inputContainer">
              <Field
                name="name"
                as={CustomInput}
                labelId="name"
                layout="input"
              />
              <Field
                name="description"
                as={CustomInput}
                labelId="description"
                layout="input"
              />

              <Field name="needsAddress">
                {({ field }) => (
                  <CustomInput
                    name={field.name}
                    labelId="needsAddress"
                    layout="checkbox"
                    modifier="secondary"
                    checked={field.value}
                    {...field}
                  />
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
                onClick={() => selectedCategoryEdited()}
              />
              {action === 'edit' ?
               <CustomButton
                titleId="delete"
                modifier="secondary"
                type="button"
                onClick={() => handleDelete()}
              /> : <div/>
                } 
            </div>
          </Form>
        </Formik>
        </DialogContent>
       </Dialog>
  );
};
