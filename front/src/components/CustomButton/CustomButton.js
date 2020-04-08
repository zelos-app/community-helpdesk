import React, { Fragment } from 'react'
import ButtonStyle from './CustomButtonStyle'
import {FormattedMessage} from 'react-intl'

export default (props) => {

  const {
    modifier = 'primary', 
    titleId = '', 
    ...rest
  } = props
  
  return (
    <Fragment>
      <ButtonStyle />
      <div className={`button ${modifier}`}>
        <div className="button-wrapper">
          <button {...rest}>
            <FormattedMessage id={titleId}/>
          </button>
        </div>
      </div>
    </Fragment>
  )
}