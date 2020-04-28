import React, { useCallback, useEffect, useState } from "react";
import axios from "../../utils/axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Field, Form, Formik } from "formik";
import FormInput from "../../components/CustomInput/FormInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default () => {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);

  const getInfo = useCallback(async () => {
    const { data = {} } = await axios.get("/api/settings/zelos");

    setInfo(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5">
            <FormattedMessage id={"connection"} />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              subdomain: info?.subdomain || "",
              email: info?.email || "",
            }}
            onSubmit={async (values, formik) => {
              try {
                await axios.put("/api/settings/zelos", { ...info, ...values });

                formik.setSubmitting(false);
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            <Form>
              <div className="input-container">
                <FormInput
                  name="subdomain"
                  label={"locale.fieldZelosSubdomain"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        .zelos.space
                      </InputAdornment>
                    ),
                  }}
                />
                <FormInput
                  name="email"
                  label={"locale.fieldZelosEmail"}
                  type={"email"}
                />
                <FormInput
                  name="password"
                  label={"locale.fieldZelosPassword"}
                  type={"password"}
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
              </div>
            </Form>
          </Formik>
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5">
            <FormattedMessage id={"settings"} />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              confirmAssignment: info?.confirmAssignment || false,
              confirmCompletion: info?.confirmCompletion || false,
              safetyWarning: info?.safetyWarning || "",
            }}
            onSubmit={async (values, formik) => {
              try {
                await axios.put("/api/settings/zelos", { ...info, ...values });

                formik.setSubmitting(false);
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            <Form>
              <div className="input-container">
                <FormInput
                  name="safetyWarning"
                  label={"safetyWarning"}
                  multiline
                />
                <FormControlLabel
                  className={"mt-10"}
                  control={
                    <Field name="confirmCompletion">
                      {({ field }) => (
                        <Checkbox
                          color="primary"
                          name={field.name}
                          checked={field.value}
                          {...field}
                        />
                      )}
                    </Field>
                  }
                  label={<FormattedMessage id="confirmCompletion" />}
                />
                <FormControlLabel
                  className={"mt-10"}
                  control={
                    <Field name="confirmAssignment">
                      {({ field }) => (
                        <Checkbox
                          color="primary"
                          name={field.name}
                          checked={field.value}
                          {...field}
                        />
                      )}
                    </Field>
                  }
                  label={<FormattedMessage id="confirmAssignment" />}
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
              </div>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};
