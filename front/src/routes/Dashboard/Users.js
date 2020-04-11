import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  Fragment,
} from "react";
import { Formik, Field, Form } from "formik";
import isEmail from "isemail";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DashboardNavigation from "../../components/DashboardNavigation/DashboardNavigation";
import { FormattedMessage } from "react-intl";
import axios from "../../utils/axios";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const UsersContext = createContext({ data: [], set: () => {} });

const UserEditModal = ({ user, setSelectedUser }) => {
  const { data, set } = useContext(UsersContext);
  return (
    <div className="modal">
      <div className="modal__content">
        <Formik
          initialValues={{
            status: { admin: user.status.admin },
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email,
          }}
          onSubmit={async (values, formik) => {
            try {
              await axios.put(`/api/users/${user._id}`, values);
              const { data: newUserData } = await axios.get(
                `/api/users/${user._id}`
              );
              set(
                data.map((u) => (u._id === newUserData._id ? newUserData : u))
              );
              setSelectedUser(null);
              formik.setSubmitting(false);
            } catch (e) {
              alert(e.message);
            }
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "required";
            } else if (!isEmail.validate(values.email)) {
              errors.email = "Invalid";
            }

            return errors;
          }}
        >
          <Form>
            <div className="input-container">
              <Field
                name="firstName"
                as={CustomInput}
                labelId="First name"
                layout="input"
              />
              <Field
                name="lastName"
                as={CustomInput}
                labelId="Last name"
                layout="input"
              />
              <Field
                name="email"
                as={CustomInput}
                labelId="Email"
                layout="input"
                type="email"
              />
              <Field name="status.admin">
                {({ field }) => (
                  <CustomInput
                    name={field.name}
                    labelId="admin"
                    layout="checkbox"
                    modifier="secondary"
                    checked={field.value}
                    {...field}
                  />
                )}
              </Field>
            </div>
            <div className="action-wrapper">
              <Field>
                {({ form }) => (
                  <CustomButton
                    titleId="Save"
                    modifier="primary"
                    type="submit"
                    disabled={form.isSubmitting || !form.isValid}
                  />
                )}
              </Field>
              <CustomButton
                titleId="Cancel"
                modifier="secondary"
                type="button"
                onClick={() => setSelectedUser(null)}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const UsersTable = ({ rows }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <Fragment>
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
              <td>{row.status.registered ?  <CheckIcon/> : <ClearIcon/>}</td>
              <td>{row.status.admin ? <CheckIcon/> : <ClearIcon/>}</td>
              <td className="action-wrapper">
                <CustomButton
                  title="Edit"
                  modifier="small primary"
                  onClick={() => setSelectedUser(row)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <UserEditModal user={selectedUser} setSelectedUser={setSelectedUser} />
      )}
    </Fragment>
  );
};

const InviteUserForm = () => {
  const { data, set } = useContext(UsersContext);

  return (
    <Formik
      onSubmit={async (values, formik) => {
        try {
          const {
            data: { id },
          } = await axios.post("/api/users/invite", values);
          formik.resetForm();
          const { data: user } = await axios.get(`/api/users/${id}`);
          set(data.concat([user]));
          formik.setSubmitting(false);
        } catch (e) {
          alert(e.message);
        }
      }}
      initialValues={{ admin: false, email: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "required";
        } else if (!isEmail.validate(values.email)) {
          errors.email = "Incorrect";
        }

        return errors;
      }}
      isInitialValid={false}
    >
      <Form>
        <div className="input-container">
          <Field
            as={CustomInput}
            name="email"
            labelId="email"
            type="email"
            modifier="secondary"
            required
          />
        </div>

        <div className="action-wrapper invite-users">
          <Field name="admin">
            {({ field }) => (
              <CustomInput
                name={field.name}
                labelId="admin"
                layout="checkbox"
                modifier="secondary"
                checked={field.value}
                {...field}
              />
            )}
          </Field>

          {/* here's a little lesson in trickery */}
          <Field>
            {({ form }) => (
              <CustomButton
                titleId="invite"
                modifier="primary"
                type="submit"
                disabled={form.isSubmitting || !form.isValid}
              />
            )}
          </Field>
        </div>
      </Form>
    </Formik>
  );
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

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

  return (
    <div className="dashboard-children users">
      <DashboardNavigation />

      <div className="dashboard-children-wrapper">
        <UsersContext.Provider value={{ data: users, set: setUsers }}>
          <h1>
            <FormattedMessage id="inviteUser" />
          </h1>

          <InviteUserForm />

          <div className="users-wrapper">
            <h1>Users</h1>
            {isLoadingUsers ? <LoadingSpinner /> : <UsersTable rows={users} />}
          </div>
        </UsersContext.Provider>
      </div>
    </div>
  );
}
