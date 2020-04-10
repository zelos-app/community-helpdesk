import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import { FormattedMessage } from "react-intl";
import axios from "../../utils/axios";

const UsersTable = ({ rows }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th scope="column">Name</th>
          <th scope="column">Email</th>
          <th scope="column">Registered?</th>
          <th scope="column">Admin?</th>
          <th scope="column"></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row._id}>
            <td>{[row.firstName, row.lastName].join(" ")}</td>
            <td>{row.email}</td>
            <td>{row.status.registered ? "✅" : "❌"}</td>
            <td>{row.status.admin ? "✅" : "❌"}</td>
            <td className="action-wrapper">
              <CustomButton title="Edit" modifier="small primary" />
              <CustomButton title="Delete" modifier="small primary" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default function Users(props) {
  const [users, setUsers] = useState([]);
  const [payload, setPayload] = useState({
    email: "",
    admin: false,
  });
  const [isLoadingInvitation, setIsLoadingInvitation] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  function handleInputChange({ target }) {
    setPayload({
      ...payload,
      [target.name]: target.value,
      ...(target.type === "checkbox" ? { [target.name]: target.checked } : {}),
    });
  }

  async function getUsers() {
    setIsLoadingUsers(true);
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data.users);
    } catch (error) {
      alert(error.message);
    }
    setIsLoadingUsers(false);
  }

  async function invite() {
    try {
      setIsLoadingInvitation(true);
      await axios.post("/api/users/invite", payload);
      alert("ok");
    } catch (error) {
      alert(error.response.data);
    }
    setIsLoadingInvitation(false);
  }

  return (
    <div className="dashboard-children users">
      <DashboardNavigation />

      <div className="dashboard-children-wrapper">
        <h1>
          <FormattedMessage id="inviteUser" />
        </h1>

        <div className="input-container">
          <CustomInput
            labelId="email"
            name="email"
            modifier="secondary"
            value={payload.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="action-wrapper invite-users">
          <CustomInput
            labelId="admin"
            name="admin"
            modifier="secondary"
            layout="checkbox"
            checked={payload.admin}
            onChange={handleInputChange}
          />

          {isLoadingInvitation ? (
            <LoadingSpinner />
          ) : (
            <CustomButton
              titleId="invite"
              modifier="primary"
              onClick={invite}
            />
          )}
        </div>

        <div className="users-wrapper">
          <h1>Users</h1>
          {isLoadingUsers ? <LoadingSpinner /> : <UsersTable rows={users} />}
        </div>
      </div>
    </div>
  );
}
