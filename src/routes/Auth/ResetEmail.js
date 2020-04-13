import axios from "axios";
import React, { useState } from "react";
import isEmail from "isemail";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

export default function ResetEmail() {
  const [email, setEmail] = useState("");

  function handleInputChange({ target }) {
    setEmail(target.value);
  }

  async function reset() {
    if (!email || !isEmail.validate(email)) {
      alert("bad email");
    }

    try {
      await axios.post(`/api/auth/reset?email=${email}`);
    } catch (error) {}
  }

  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">
        <div className="input-container">
          <CustomInput
            labelId="email"
            name="email"
            modifier="primary"
            type="email"
            onChange={handleInputChange}
          />
        </div>

        <div className="action-wrapper">
          <CustomButton
            titleId="sendPasswordToEmail"
            modifier="primary"
            onClick={reset}
          />
        </div>
      </div>
    </div>
  );
}
