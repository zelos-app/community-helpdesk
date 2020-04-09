import React from 'react'

export default function Auth (props) {
  return (
    <div className="auth">
      <div className="auth-wrapper">
        {props.children}
      </div>
    </div>
  )
}