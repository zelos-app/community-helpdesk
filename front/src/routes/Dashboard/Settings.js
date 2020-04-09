import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useHistory, Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

export default function Settings(props) {
  return (
    <div className="dashboard-children settings">
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>&nbsp;/&nbsp;
        <Link to="/dashboard/settings">Settings</Link>
      </div>

      <div className="dashboard-children-wrapper">
        <Link to="/dashboard/users">Users</Link>
      </div>
    </div>
  );
}
