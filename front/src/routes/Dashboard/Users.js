import React, {useState, useEffect} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import {Link} from "react-router-dom"
import {FormattedMessage} from 'react-intl'
import axios from 'axios'

export default function Users (props) {
  const [users, setUsers] = useState([])
  const [payload, setPayload] = useState({
    email: '',
    admin: false
  })
  const [isLoadingInvitation, setIsLoadingInvitation] = useState(false)
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  function handleInputChange ({target}) {
    
    setPayload({
      ...payload,
      [target.name]: target.value,
      ...(target.type === 'checkbox' ? ({[target.name]: target.checked}) : {})
    })
  }

  async function getUsers () {
    setIsLoadingUsers(true)
    try {
      const {data} = await axios.get('/api/users')
      setUsers(data.users || [])
    } catch (error) {
      alert('no users')
    }
    setIsLoadingUsers(false)
  }

  async function invite () {

    try {
      setIsLoadingInvitation(true)
      await axios.post('/api/users/invite', payload)
      alert('ok')
    } catch (error) {
      alert(error.response.data)
    }
    setIsLoadingInvitation(false)
  }

  function User (user) {
    return (
      <div className="user">
        <h5>{ user.email }</h5>
      </div>
    )
  }
  
  return (
    <div className="dashboard-children users">
      
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>&nbsp;/&nbsp;
        <Link to="/dashboard/settings">Settings</Link>&nbsp;/&nbsp; 
        <Link to="/dashboard/invite">Users</Link>
      </div>
      
      <div className="dashboard-children-wrapper">

      <FormattedMessage id="inviteUser" />

      <div className="input-container">
        <CustomInput
          labelId="email"
          name="email"
          modifier="secondary"
          value={payload.email}
          onChange={handleInputChange}/>
      </div>
        
      <div className="action-wrapper invite-users">
        <CustomInput
          labelId="admin"
          name="admin"
          modifier="secondary"
          layout="checkbox"
          checked={payload.admin}
          onChange={handleInputChange}/>
        
        {isLoadingInvitation 
          ? <LoadingSpinner /> 
          : <CustomButton 
              titleId="invite"
              modifier="primary"
              onClick={invite}/>
        }
      </div>

      {/* <div className="users-wrapper">
        {isLoadingUsers
          ? <LoadingSpinner /> 
          : users.map((user) => <User {...user} />)
        }
      </div>
         */}
      </div>
    </div>
  )
}