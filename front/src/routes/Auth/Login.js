import axios from 'axios'
import isEmail from 'isemail'
import React, {useState} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'

export default function Login () {

  const [payload, setPayload] = useState({})

  function handleInputChange ({target}) {
    setPayload({
      ...payload,
      [target.name]: target.value
    })
  }

  async function login () {
    if (!payload.email || !isEmail.validate(payload.email)) {
      alert('bad email')
    }

    try {
      await axios.post(`/api/auth`, payload)
    } catch (error) {

    }
  }
 
  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">

        <div className="input-container">
          <CustomInput
            labelId="email"
            name="email"
            modifier="primary"
            onChange={handleInputChange}/>

          <CustomInput
            labelId="password"
            name="password"
            modifier="primary"
            type="password"
            onChange={handleInputChange}/>
        </div>

        <div className="action-wrapper">
          <CustomButton 
            titleId="login"
            modifier="primary"
            onClick={login}/>
        </div>

      </div>
    </div>
  )
}