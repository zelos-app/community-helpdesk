import React from 'react'

export default function Auth (props) {
  return (
    <div className="request">
      <div className="request-wrapper">
        {props.children}
      </div>
    </div>
  )
}