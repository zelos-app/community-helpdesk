import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {FormattedMessage} from 'react-intl'

import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'

export default function Main () {

  function handleInputChange ({target}) {
    console.log(target.value)
  }

  function createTask () {

  }

  function handleFilters () {

  }



  const Ticket = ({request = '', createdAt = '', category = '', area = '' }) => {

    const date = new moment(createdAt).format('DD.MM.YY')
    const displayedDate = date !== 'invalid date'
      ? date
      : ''
    
    return (
      <div className="ticket">
        <div className="ticket-wrapper">
          <h5>{request}</h5>

          <div className="footer">
            <h5>{displayedDate}</h5>
            <h5>{category}</h5>
            <h5>{area}</h5>
          </div>
          
        </div>
      </div>
    )
  }
  
  return (
    <div className="dashboard-children main">
      <div className="dashboard-children-wrapper">

        <div className="header">
          <div className="nav">
            <Link to="/dashboard">
              <FormattedMessage id="tickets"/>
            </Link>
            <Link to="/dashboard/settings">
              <FormattedMessage id="settings"/>
            </Link>
          </div>
        </div>
    
        <div className="tickets">
          <div className="ticket-list">

            {/* FILTERS */}
            <div className="filter-list">
              <h5>
                <FormattedMessage id="filters"/>
              </h5>
              <div className="filters">
                {['new', 'mine', 'solved', 'rejected'].map((filter) => (
                  <CustomInput
                    labelId={filter}
                    name={filter}
                    modifier="secondary"
                    layout="select"
                    onChange={handleFilters}/>
                ))}
              </div>
            </div>
            {/* END FILTERS */}

            {/* TICKETS */}
            <div className="ticket-list-wrapper">
              {tickets.map((ticket) => <Ticket {...ticket} />)}
            </div>
            {/* END TICKETS */}
          </div>

          <div className="task-manager">

            <div className="flex-end action-wrapper">
              <CustomButton 
                titleId="newTask"
                modifier="secondary"
                onClick={createTask}/>
            </div>

            <div className="task-manager-wrapper">
              <div className="input-container">

                <CustomInput
                  labelId="request"
                  name="request"
                  modifier="secondary"
                  layout="textarea"
                  onChange={handleInputChange}/>

                <CustomInput
                  labelId="requesterName"
                  name="requesterName"
                  modifier="secondary"
                  onChange={handleInputChange}/>

                <CustomInput
                  labelId="category"
                  name="category"
                  modifier="secondary"
                  onChange={handleInputChange}/>

                <CustomInput
                  labelId="phone"
                  name="phone"
                  modifier="secondary"
                  onChange={handleInputChange}/>

                <CustomInput
                  labelId="address"
                  name="address"
                  modifier="secondary"
                  onChange={handleInputChange}/>

                <CustomInput
                  labelId="area"
                  name="area"
                  modifier="secondary"
                  onChange={handleInputChange}/>

                <CustomInput
                  labelId="assignee"
                  name="assignee"
                  modifier="primary"
                  onChange={handleInputChange}/>

                <div className="flex-end action-wrapper">
                  <CustomButton 
                    titleId="createTask"
                    modifier="primary"
                    onClick={createTask}/>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      
        
      </div>
    </div>
  )
}

const tickets = [
  {
    name: "Name",
    phone: "Phone",
    area: "Arena",
    category: "Category",
    address: "Address",
    request: "por incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo",
    createdAt: Date.now(),
    status: {
      rejected: false,
      accepted: false,
      solved: false,
      archived: false,
      notified: false
    }
  },
  {
    name: "Name",
    phone: "Phone",
    area: "Arena",
    category: "Category",
    address: "Address",
    request: "m dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, qu",
    createdAt: Date.now(),
    status: {
      rejected: false,
      accepted: false,
      solved: false,
      archived: false,
      notified: false
    }
  },
  {
    name: "Name",
    phone: "Phone",
    area: "Arena",
    category: "Category",
    address: "Address",
    request: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: Date.now(),
    status: {
      rejected: false,
      accepted: false,
      solved: false,
      archived: false,
      notified: false
    }
  },
  {
    name: "Name",
    phone: "Phone",
    area: "Arena",
    category: "Category",
    address: "Address",
    request: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    createdAt: Date.now(),
    status: {
      rejected: false,
      accepted: false,
      solved: false,
      archived: false,
      notified: false
    }
  },
]