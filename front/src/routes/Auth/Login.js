import isEmail from 'isemail'
import React from 'react'
import { Formik } from 'formik';
import history from '../../utils/history';
import axios from '../../utils/axios';
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'

const login = async ({email, password}) => {
  let res;
  try {
    res = await axios.post('/api/auth/login', {
      email,
      password,
    });
  } catch(e) {
    alert(e.message);
  }

  const { token, exp } = res.data;

  localStorage.setItem('jwtToken', token);
  localStorage.setItem('jwtExpires', exp);

  history.push('/dashboard');
}

export default function Login () {
  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">
        <Formik
          initialValues={{email: '', password: ''}}
          validate={(values) => {
            const errors = {};
            
            if (!values.email) {
              errors.email = 'Required';
            } else if (!isEmail.validate(values.email)) {
              errors.email = 'Bad';
            }

            if (!values.password) {
              errors.password = 'Required';
            }

            return errors;
          }}
          onSubmit={values => login(values)}
        >
          {
            (props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="input-container">
                  <CustomInput
                    labelId="email"
                    name="email"
                    modifier="primary"
                    type="email"
                    onChange={props.handleChange}
                    value={props.values.email}
                    required
                  />
                  <CustomInput
                    labelId="password"
                    name="password"
                    modifier="primary"
                    type="password"
                    onChange={props.handleChange}
                    value={props.values.password}
                    required
                  />
                </div>
                <div className="action-wrapper">
                  <CustomButton
                    titleId="login"
                    modifier="primary"
                  />
                </div>
              </form>
            )
          }
        </Formik>
      </div>
    </div>
  )
}