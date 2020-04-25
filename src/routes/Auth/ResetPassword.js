import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function ResetPassword() {
  let { token } = useParams();

  const [payload, setPayload] = useState({});
  const [isValid] = useState(true);

  useEffect(() => {
    async function checkToken() {
      await axios.get(`/api/auth/reset/${token}`);
    }

    checkToken();
  }, [token]);

  function handleInputChange({ target }) {
    setPayload({
      ...payload,
      [target.name]: target.value,
    });
  }

  async function reset() {
    if (!isValid) alert("token not valid");
    await axios.put(`/api/auth/reset/${token}`, payload);
  }

  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">
        <div className="input-container">
          <TextField
            style={{ width: "100%" }}
            className="input"
            id="password"
            name="password"
            label={<FormattedMessage id="password" />}
            variant="outlined"
            type="password"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="action-wrapper">
          <Button variant="contained" color="primary" onClick={reset}>
            <FormattedMessage id="sendPasswordToEmail" />
          </Button>
        </div>
      </div>
    </div>
  );
}
