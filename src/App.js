import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Container, Grid } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { config } from 'react-spring'
import { animated, Transition } from 'react-spring/renderprops'

// Components
import ScrollingWrapper from './components/scroll/ScrollingWrapper'
import NavigationBar from './components/layout/navbar/Navbar'
import Loading from './components/feedback/Loading'
import Error from './components/feedback/Error'
import NoMatch from './pages/NoMatch'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/scroll/ScrollToTop'
import PrivateRoute from 'routes/PrivateRoute'
import routes from 'routes/AllRoutes'
import SEO from 'components/Seo'

const MainContainer = animated(Container)

const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        keys={location => location.pathname}
        from={{ position: 'absolute', opacity: 0, display: 'none' }}
        enter={{ position: 'static', opacity: 1, display: 'block' }}
        leave={{ position: 'absolute', opacity: 0, display: 'none' }}
        config={{ ...config.default, duration: 800 }}
      >
        {location => style => (
          <animated.div style={style}>{children(location)}</animated.div>
        )}
      </Transition>
    )}
  />
)

const App = () => {
  const errorApi = useSelector(state => state.apiCalls.error)
  const isLoading = useSelector(state => state.apiCalls.isLoading)
  const auth = useSelector(state => state.firebase.auth.uid)
  const userProfile = useSelector(state => state.firebase.profile)
  console.log(userProfile)

  return (
    <>
      <SEO description="PokéFav, a place to gather your favorite Pokémons, create a ideal Pokémon Team, play PokéTrivia, explore Pokémon Cards and more!" />

      <ScrollToTop />
      <ScrollingWrapper />
      <Grid
        minHeight="100vh"
        gridTemplateRows={auth ? 'auto 1fr auto' : 'auto 1fr'}
      >
        {auth && <NavigationBar />}
        {isLoading ? (
          <Loading />
        ) : errorApi ? (
          <Error error={errorApi} />
        ) : (
          <MainContainer
            maxW={auth ? ['95%', '90%', '80%'] : '100%'}
            py={auth ? 12 : 0}
            px={auth ? 10 : 0}
          >
            <AnimatedRoute>
              {location => (
                <Switch location={location}>
                  {routes.map(({ path, name, isPrivate, Component }) =>
                    isPrivate ? (
                      <PrivateRoute
                        exact
                        key={name}
                        path={path}
                        location={location}
                        component={Component}
                      />
                    ) : (
                      <Route
                        exact
                        key={name}
                        path={path}
                        component={Component}
                      />
                    )
                  )}
                  <Route component={NoMatch} />
                </Switch>
              )}
            </AnimatedRoute>
          </MainContainer>
        )}
        <Footer />
      </Grid>
    </>
  )
}

export default App
