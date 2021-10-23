import React from 'react'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, authenticated, path, exact }) => {
  const auth = useSelector(state => state.firebase.auth)

  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        isLoaded(auth) && !isEmpty(auth) ? <Component /> : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute
