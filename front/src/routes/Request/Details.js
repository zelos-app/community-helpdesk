import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {FormattedMessage} from 'react-intl'
import {useHistory} from "react-router-dom"
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput/CustomInput'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import {requestStore} from '../../store'


function Details () {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [areas, setAreas] = useState([])
  const phoneRef = React.createRef()

  const [requestDetails, setRequestDetails] = useState({
    ...requestStore,
    name: '',
    phone: '+372 ',
    address: '',
    area: ''
  })

  async function getAreas () {
    const {data = {}} = await axios.get('/api/areas')
    setAreas(data.areas || [])
  }

  useEffect(() => {
    getAreas()
  }, [])

  async function next () {
    setIsLoading(true)
    await axios.post('/api/tickets', {...requestDetails})
    setIsLoading(false)
    history.push('/confirmed')
  }

  function handleInputChange ({target}) {
    setRequestDetails({
      ...requestDetails,
      [target.name]: target.value
    })
  } 

  function selectArea (name) {
    console.log(name)
    setRequestDetails({
      ...requestDetails,
      area: name
    })
  }

  function Area ({_id, name}) {
    return (
      <div
        onClick={ () => selectArea(name)}
       className="area">
        <h5>{name}</h5>
      </div>
    )
  }

  return (
    <div className="request-children details">
      <div className="request-children-wrapper">

        <div className="text-wrapper">
          <h1 className="text-alpha">
            <FormattedMessage id="enterYourDetails"/>
          </h1>
        </div>

        <div className="input-container">

          <CustomInput
            labelId="fullName"
            name="name"
            modifier="secondary"
            value={requestDetails.name}
            onChange={handleInputChange}/>

          <CustomInput
            labelId="phone"
            name="phone"
            modifier="secondary"
            value={requestDetails.phone}
            onChange={handleInputChange}/>

          <CustomInput
            labelId="address"
            name="address"
            modifier="secondary"
            value={requestDetails.address}
            onChange={handleInputChange}/>

          <CustomInput
            labelId="area"
            name="area"
            modifier="secondary"
            value={requestDetails.area}
            onChange={handleInputChange}/>

          <div className="area-wrapper">
            {areas.slice(0, 10).map((area) => <Area key={area._id} {...area}/>)}
          </div>
          
        </div>

        <div className="action-wrapper">
          {isLoading 
            ? <LoadingSpinner /> 
            : <CustomButton 
                titleId="next"
                modifier="primary"
                onClick={next}/>
          }
        </div>
        
        
      </div>
    </div>

  )
}

export default Details