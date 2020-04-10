import React, {useState, useEffect} from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import DashboardNavigation from '../../components/DashboardNavigation/DashboardNavigation'
import {useHistory, Link} from "react-router-dom"
import {FormattedMessage} from 'react-intl'

export default function Settings (props) {


  return (
    <div className="dashboard-children settings">
      <DashboardNavigation />
    </div>
  )
}
