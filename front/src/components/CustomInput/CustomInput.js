import React, { Fragment } from 'react'
import {FormattedMessage} from 'react-intl'
import InputStyle from './CustomInputStyle'

export default (props) => {

  const {
    modifier = 'primary', 
    labelId = null, 
    name = 'input', 
    layout = 'input', 
    ...rest
  } = props
  
  return (
    <Fragment>
      <InputStyle />
      <div className={`input ${modifier}`}>
        <div className="input-wrapper">

          {/* LABEL */}
          <label htmlFor={name}>
            <FormattedMessage dataset="ok" id={labelId}/>
          </label>

          {/* INPUT */}
          {layout === 'input' ? (
            <input 
              name={name}
              {...rest}/>
          ) : ''}

          {/* TEXTAREA */}
          {layout === 'textarea' ? (
            <textarea 
              name={name}
              {...rest}></textarea>
          ) : ''}

        </div>
      </div>
    </Fragment>
  )
}