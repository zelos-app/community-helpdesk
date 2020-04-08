import React from 'react'
import {Route, Switch} from 'react-router-dom'

// Routes
import Intro from './routes/Request/Intro/Intro'
import Category from './routes/Request/Category/Category'
import Request from './routes/Request/Request/Request'
import Details from './routes/Request/Details/Details'
import Confirmed from './routes/Request/Confirmed/Confirmed'

export default () => {

  // const { listen } = useHistory()

  // const saveTranslation = (key, translation) => {
  //   console.log(document.documentElement.lang, key, translation)
  // } 

  // const initEditables = () => {
  //   const editables = [...document.querySelectorAll('[editable]')]

  //   editables.forEach((oneEditable) => {
  //     oneEditable.onclick = () => {
  //       oneEditable.contentEditable = true
  //       oneEditable.onblur = () => {
          
  //         saveTranslation(oneEditable.attributes.editable.value, oneEditable.innerText)
  //       }
  //     }
  //   })
  // }

  // useEffect(() => {
  //   const unlisten = listen((location) => {
  //     initEditables()
  //   })
  //   return unlisten
  // }, [listen])

  // useEffect(() => {
  //   initEditables()
  // })
  
  return (
    <Switch>

        <Route 
          path="/intro" 
          component={Intro}/>

        <Route 
          path="/category" 
          component={Category}/>

        <Route 
          path="/request" 
          component={Request}/>

        <Route 
          path="/details" 
          component={Details}/>

        <Route 
          path="/confirmed" 
          component={Confirmed}/>

    </Switch>
  )
}