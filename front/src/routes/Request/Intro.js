import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import {FormattedMessage} from 'react-intl'
import {useHistory} from "react-router-dom"
import {requestStore} from '../../store'

function Intro () {
  const history = useHistory()
    
  function select (status) {
    requestStore.intro = status
    history.push('/category')
  }
  
  return (
    <div className="request">
      <div className="request-wrapper">
        <div className="request-children intro">
          <div className="request-children-wrapper">

            <div className="text-wrapper">
              <h1 
                className="text-alpha"
                editable="introHead">
                <FormattedMessage id="introHead"/>
              </h1>
              <h3 className="text-alpha">
                <FormattedMessage id="introBody"/>
              </h3>
            </div>


            <div className="action-wrapper">
              <CustomButton 
                titleId="iNeedHelp"
                modifier="primary"
                onClick={() => select('NEED_HELP')}/>

              <CustomButton 
                titleId="iWantToHelp"
                modifier="secondary"
                onClick={() => select('OFFER_HELP')}/>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Intro