import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../../actions/auth'

const LoginPage = ( props) => { // destructured props object
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={props.startLogin}>Log in</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
    startLogin:() => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)  