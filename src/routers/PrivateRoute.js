import React from 'react';
import { connect } from 'react-redux';
import { Route,Redirect } from 'react-router-dom';

import Header from '../components/Header';

const PrivateRoute = (
  //we renamed component because we are going to render it
  {isAuthenticated, component:Component,...rest } // destructuring of "props.isAuthenticated" and "component"
) => {
  return (
    //...rest zawiera reszte propsow ktorych nie zdestrukcjonowalismy(path etc)
    <Route {...rest} component={ props => {
      console.log('propsy:',props,"restt:",...rest)
      return isAuthenticated ? (
        <div>
        <Header />
        <Component {...props} />
        </div>
        
      )
      :
      (
        <Redirect to="/" />
      );
    }}/>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated:!!state.auth.uid // convert to boolean
})


export default connect(mapStateToProps)(PrivateRoute)