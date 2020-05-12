import React, { useEffect, useCallback, useState } from "react";
import {
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { FormattedMessage } from "react-intl";

import FormInput from "../../components/CustomInput/FormInput";
import CustomButton from "../../components/CustomButton/CustomButton";

import axios from "../../utils/axios";

export default () => {
  const [info, setInfo] = useState(null);

  const getInfo = useCallback(async () => {
    const { data } = await axios.get("/api/settings/sms");

    setInfo(data);
  }, []);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  if (info === null) {
    return null;
  }

  return (
    <>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom variant="h5">
            <FormattedMessage id="messages" />
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Formik
            initialValues={{
              ...info,
              Infobip: {
                // API returns Infobip as empty object if fields aren't set initially
                baseUrl: info.Infobip.baseUrl || "",
                apiKey: info.Infobip.apiKey || "",
              },
            }}
            onSubmit={async (values, formik) => {
              const { provider, Infobip, ...rest } = values;
              let valuesToSend = rest;

              if (Infobip.apiKey.length !== 0 && Infobip.baseUrl.length !== 0) {
                valuesToSend.Infobip = Infobip;
              } else {
                valuesToSend.Infobip = {};
              }

              try {
                await axios.put("/api/settings/sms", valuesToSend);

                formik.setSubmitting(false);
              } catch (e) {
                alert(e.message);
              }
            }}
          >
            <Form>
              <div className="input-container">
                <FormInput
                  name="Infobip.baseUrl"
                  label="messages.infobip.baseUrl"
                />

                <FormInput
                  name="Infobip.apiKey"
                  label="messages.infobip.apiKey"
                />

                <FormInput name="prefix" label="messages.prefix" />

                <Field name="sendAcceptText">
                  {({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          name={field.name}
                          checked={field.value}
                          {...field}
                        />
                      }
                      label={<FormattedMessage id="messages.sendAcceptText" />}
                    />
                  )}
                </Field>

                <FormInput
                  name="acceptText"
                  label="messages.acceptText"
                  multiline
                />

                <Field name="sendRejectText">
                  {({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          name={field.name}
                          checked={field.value}
                          label={
                            <FormattedMessage id="messages.sendRejectText" />
                          }
                          {...field}
                        />
                      }
                      label={<FormattedMessage id="messages.sendRejectText" />}
                    />
                  )}
                </Field>

                <FormInput
                  name="rejectText"
                  label="messages.rejectText"
                  multiline
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
