import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

export default function Register (props, e) {
  let {token} = useParams()
  const history = useHistory()

  const [payload, setPayload] = useState({})
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  async function checkToken () {
    await axios.get(`/api/auth/reset/${token}`)
  }

  useEffect(() => {
    checkToken()
  }, [])

  function handleInputChange ({target}) {
    setPayload({
      ...payload,
      [target.name]: target.value
    })
  }

  async function register () {
    setIsLoading(true)

    if (!isValid) {
      alert('token not valid')
      return setIsLoading(false)
    }

    try {  
      await axios.put(`/api/auth/register/${token}`, payload)
      history.push('/login')
    } catch (error) {
      alert(error.response.data)
    }
    setIsLoading(false)
  }
 
  return (
    <div className="auth-children">
      <div className="auth-children-wrapper">

        <div className="input-container">
          <CustomInput
            labelId="firstName"
            name="firstName"
            modifier="primary"
            onChange={handleInputChange}/>

          <CustomInput
            labelId="lastName"
            name="lastName"
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

        {isLoading 
            ? <LoadingSpinner /> 
            : <CustomButton 
                titleId="register"
                modifier="primary"
                onClick={register}/>
          }
        </div>

      </div>
    </div>
  )
}