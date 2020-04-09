import React, { Fragment } from 'react'
import ButtonStyle from './CustomButtonStyle'
import {FormattedMessage} from 'react-intl'

export default (props) => {

  const {
    modifier = 'primary', 
    titleId = '', 
    title = '',
    ...rest
  } = props
  
  return (
    <Fragment>
      <ButtonStyle />
      <div className={`button ${modifier}`}>
        <div className="button-wrapper">
          <button {...rest}>
            {titleId == ''
              ? title
              : <FormattedMessage id={titleId}/>
            }
          </button>
        </div>
      </div>
    </Fragment>
  )
}