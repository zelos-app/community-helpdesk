import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

// Routes
import Intro from './routes/Request/Intro'

// Auth
import Auth from './routes/Auth/Auth'
import Login from './routes/Auth/Login'
import Register from './routes/Auth/Register'
import ResetEmail from './routes/Auth/ResetEmail'
import ResetPassword from './routes/Auth/ResetPassword'

// Dashboard
import Dashboard from './routes/Dashboard/Dashboard'
import Main from './routes/Dashboard/Main'

// Request
import RequestWrapper from './routes/Request/RequestWrapper'
import Details from './routes/Request/Details'
import Request from './routes/Request/Request'
import Category from './routes/Request/Category'
import Confirmed from './routes/Request/Confirmed'


export default () => {
  
  return (
    <Switch>
      <Route exact path="/" component={Intro} />
      <Route
        path="/auth"
        render={({match:{path}}) => (
          <Auth>
            <Switch>
              <Redirect exact from ={path} to={`${path}/login`} />
              <Route path={`${path}/login`} component={Login} />
              <Route path={`${path}/register/:token`} component={Register} />
              <Route path={`${path}/reset-email`} component={ResetEmail} />
              <Route path={`${path}/reset-password/:token`} component={ResetPassword} />
            </Switch>
          </Auth>
        )}
      />
      <Route
        path="/request"
        render={({match: {path}}) => (
          <RequestWrapper>
            <Switch>
              <Redirect exact from={path} to={`${path}/category`} />
              <Route path={`${path}/category`} component={Category} />
              <Route path={`${path}/request`} component={Request} />
              <Route path={`${path}/details`} component={Details} />
              <Route path={`${path}/confirmed`} component={Confirmed} />
            </Switch>
          </RequestWrapper>
        )}
      />
      <Route
        path="/dashboard"
        render={({match: {path}}) => (
          <Dashboard>
            <Switch>
              <Redirect exact from ={path} to={`${path}/tickets`} />
              <Route from={`${path}/tickets`} component={Main} />
              <Route from={`${path}/settings`}>TODO</Route>
            </Switch>
          </Dashboard>
       )}
      />
    </Switch>
  )
}