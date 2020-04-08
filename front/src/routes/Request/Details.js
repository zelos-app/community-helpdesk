import React from 'react'
import {FormattedMessage} from 'react-intl'
import {useHistory} from "react-router-dom"
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import {requestStore} from '../../store'


function Details () {
  const history = useHistory()

  function next () {
    
    
    // history.push('/confirmed')
  }

  function handleInputChange ({target}) {
    requestStore[target.name] = target.value
  }

  return (
    <div className="request">
      <div className="request-wrapper">
        <div className="request-children details">
          <div className="request-children-wrapper">


            <div className="text-wrapper">
              <h1 className="text-alpha">
                <FormattedMessage id="enterYourDetails"/>
              </h1>
            </div>

            <div className="input-container">

              <CustomInput
                labelId="fullName"
                name="fullName"
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
              
            </div>

            <div className="action-wrapper">
              <CustomButton 
                titleId="next"
                modifier="primary"
                onClick={next}/>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details