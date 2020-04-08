import React from 'react'
import {requestStore} from '../../../store'

function Confirmed () {


  
  return (
    <div className="request">
      <div className="request-wrapper">
        <div className="request-children confirmed">
          <div className="request-children-wrapper">
            {JSON.stringify(requestStore)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmed