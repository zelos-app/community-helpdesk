import React from 'react'
import {Route, Switch} from 'react-router-dom'

// Routes
import RequestWrapper from './routes/Request/RequestWrapper'
import Intro from './routes/Request/Intro'
import Category from './routes/Request/Category'
import Request from './routes/Request/Request'
import Details from './routes/Request/Details'
import Confirmed from './routes/Request/Confirmed'

// Auth
import Auth from './routes/Auth/Auth'
import Login from './routes/Auth/Login'
import Register from './routes/Auth/Register'
import ResetEmail from './routes/Auth/ResetEmail'
import ResetPassword from './routes/Auth/ResetPassword'
import SendLink from './routes/Auth/SendLink'

// Dashboard
import Dashboard from './routes/Dashboard/Dashboard'
import MainView from './routes/Dashboard/Main'

export default () => {
  
  return (
    <Switch>
        <Route path="/login">
          <Auth>
            <Login />
          </Auth>
        </Route>

        <Route exact path="/register/:token">
          <Auth>
            <Register />
          </Auth>
        </Route>

        <Route exact path="/reset-email">
          <Auth>
            <ResetEmail />
          </Auth>
        </Route>

        <Route exact path="/reset-password/:token">
          <Auth>
            <ResetPassword />
          </Auth>
        </Route>

        <Route exact path="/dashboard">
          <Dashboard>
            <MainView />
          </Dashboard>
        </Route>

        <Route exact path="/intro">
          <RequestWrapper>
            <Intro/>
          </RequestWrapper>
        </Route>

        <Route exact path="/category">
          <RequestWrapper>
            <Category />
          </RequestWrapper>
        </Route>

        <Route exact path="/request">
          <RequestWrapper>
            <Request />
          </RequestWrapper>
        </Route>

        <Route exact path="/details">
          <RequestWrapper>
            <Details />
          </RequestWrapper>
        </Route>

        <Route exact path="/confirmed">
          <RequestWrapper>
            <Confirmed />
          </RequestWrapper>
        </Route>

    </Switch>
  )
}