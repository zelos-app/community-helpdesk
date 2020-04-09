import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CustomButton from '../../components/CustomButton/CustomButton'
import {FormattedMessage} from 'react-intl'
import {useHistory} from "react-router-dom"
import {requestStore} from '../../store'

function Category () {
  const history = useHistory()
  const [categories, setCategories] = useState([])

  async function getCategories () {
    try {
      const {data = {}} = await axios.get('/api/categories')
      const {categories = []} = data
      setCategories(categories)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  function select (id) {
    requestStore.category = id
    history.push('/request')
  }

  const SelectorButtons = () => {
    return categories.map((category) => (
      <CustomButton 
        key={category._id}
        title={category.name}
        modifier="secondary"
        onClick={() => select(category._id)}/>
    ))
  }

  return (
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
  )
}

export default Category