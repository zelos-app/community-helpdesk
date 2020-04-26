import React, { useCallback, useEffect, useState } from "react";
import axios from "../../utils/axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Field, Form, Formik } from "formik";
import FormInput from "../../components/CustomInput/FormInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FormattedMessage } from "react-intl";
import InputAdornment from "@material-ui/core/InputAdornment";

export const Zelos = () => {
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
          <Typography gutterBottom variant="h4">
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
    </>
  );
};
