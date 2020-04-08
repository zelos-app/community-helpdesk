import React from 'react'
import CustomButton from '../../../components/CustomButton/CustomButton'
import {FormattedMessage} from 'react-intl'
import {useHistory} from "react-router-dom"
import {requestStore} from '../../../store'

function Category () {
  const history = useHistory()

  function select (category) {
    requestStore.category = category
    history.push('/request')
  }

  const SelectorButtons = () => {
    const payload = [
      {
        id: 12,
        titleId: 'shopping'
      },
      {
        id: 13,
        titleId: 'walkingAPet'
      }
    ]

    return payload.map((category) => (
      <CustomButton 
        key={category.id}
        titleId={category.titleId}
        modifier="secondary"
        onClick={() => select(category)}/>
    ))
  }

  return (
    <div className="request">
      <div className="request-wrapper">
        <div className="request-children category">
          <div className="request-children-wrapper">

            <div className="text-wrapper">
              <h1 className="text-alpha">
                <FormattedMessage id="categoryHead"/>
              </h1>
              <h3 className="text-alpha">
                <FormattedMessage id="categoryBody"/>
              </h3>
            </div>

            <div className="action-wrapper">
              <SelectorButtons />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category