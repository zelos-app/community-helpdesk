import React from 'react'
import {Route, Switch} from 'react-router-dom'

// Routes
import Intro from './routes/Intro/Intro'
import Category from './routes/Category/Category'
import Request from './routes/Request/Request'
import Details from './routes/Details/Details'
import Confirmed from './routes/Confirmed/Confirmed'

export default () => {
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