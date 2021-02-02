import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, useSelector } from 'react-redux'
import { createFirestoreInstance } from 'redux-firestore'
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'redux/store'

import firebase from 'firebase/app'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import rrfConfig from 'config/rrfConfig'
import pokeFavTheme from 'styles/theme'
import App from './App'
import './styles/App.scss'
import Loading from 'components/feedback/Loading'

const AuthIsLoaded = ({ children }) => {
  const profile = useSelector(state => state.firebase.profile)
  // const auth = useSelector(state => state.firebase.auth)

  return !isLoaded(profile) ? (
    <Flex justify="center" align="center" minH="100vh">
      <Loading />
    </Flex>
  ) : (
    children
  )
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={true} persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
            <ChakraProvider theme={pokeFavTheme}>
              <App />
            </ChakraProvider>
          </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
