import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({isAuthenticated,...rest, component:Component}) => {
  return (
    <Route {...rest} component={ (props) => {
      return(
        isAuthenticated ? (
          <Redirect to='/dashboard' />
        )
        :
        (
          <Component {...props}/> // we pass props manually, component gets props by default from router 
          // but since we are render our component conditionally we must pass props manually
        )
      )
    }} />
  )
}

const mapStateToProps = (state) => ({
    isAuthenticated:!!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)