import axios from "axios";
import isEmail from "isemail";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";

export default function SendLink(props, e) {
  const [email, setEmail] = useState("");

  function handleInputChange({ target }) {
    setEmail(target.value);
  }

  async function sendLink() {
    if (!email || !isEmail.validate(email)) {
      alert("bad email");
    }
    // await axios.put()
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
            titleId="sendEmail"
            modifier="primary"
            onClick={sendLink}
          />
        </div>
      </div>
    </div>
  );
}
