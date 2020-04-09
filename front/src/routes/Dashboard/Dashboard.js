import React from 'react'

export default function Dashboard (props) {
  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        {props.children}
      </div>
    </div>
  )
}