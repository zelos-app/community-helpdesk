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
import AuthWrapper from './routes/Auth/AuthWrapper'
import Login from './routes/Auth/Login'
import Register from './routes/Auth/Register'
import ResetEmail from './routes/Auth/ResetEmail'
import ResetPassword from './routes/Auth/ResetPassword'
import SendLink from './routes/Auth/SendLink'

// Dashboard
import DashboardWrapper from './routes/Dashboard/DashboardWrapper'
import MainView from './routes/Dashboard/Main'
import Users from './routes/Dashboard/Users'
import Settings from './routes/Dashboard/Settings'

export default () => {
  
  return (
    <Switch>
        {/* AUTH */}
        <Route path="/login">
          <AuthWrapper>
            <Login />
          </AuthWrapper>
        </Route>

        <Route exact path="/register/:token">
          <AuthWrapper>
            <Register />
          </AuthWrapper>
        </Route>

        <Route exact path="/reset-email">
          <AuthWrapper>
            <ResetEmail />
          </AuthWrapper>
        </Route>

        <Route exact path="/reset-password/:token">
          <AuthWrapper>
            <ResetPassword />
          </AuthWrapper>
        </Route>
        {/* END AUTH */}

        {/* DASHBOARD */}
        <Route exact path="/dashboard">
          <DashboardWrapper>
            <MainView />
          </DashboardWrapper>
        </Route>

        <Route exact path="/dashboard/settings">
          <DashboardWrapper>
            <Settings />
          </DashboardWrapper>
        </Route>

        <Route exact path="/dashboard/users">
          <DashboardWrapper>
            <Users />
          </DashboardWrapper>
        </Route>
        {/* END DASHBOARD */}

        {/* REQUEST */}
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
        {/* END REQUEST */}

    </Switch>
  )
}