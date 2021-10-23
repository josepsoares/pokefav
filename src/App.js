import React, { useEffect } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { Container, Grid, Flex, Image } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from 'react-spring';
import { animated, Transition } from 'react-spring/renderprops';

// Components
import ScrollingWrapper from './components/scroll/ScrollingWrapper';
import NavigationBar from './components/layout/navbar/Navbar';
import ToastProvider from './components/feedback/ToastProvider';
import Loading from './components/feedback/Loading';
import Error from './components/feedback/Error';
import VerifyEmail from 'components/feedback/VerifyEmail';
import NoMatch from './pages/NoMatch';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/scroll/ScrollToTop';
import PrivateRoute from 'routes/PrivateRoute';
import routes from 'routes/AllRoutes';
import SEO from 'components/Seo';

const MainContainer = animated(Container);

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
        {location => style =>
          <animated.div style={style}>{children(location)}</animated.div>}
      </Transition>
    )}
  />
);

const App = () => {
  const isLoadingPokemonApi = useSelector(state => state.pokemonApi.isLoading);
  const isLoadingUserApi = useSelector(state => state.user.isLoading);
  const errorPokemonApi = useSelector(state => state.pokemonApi.error);
  const errorUser = useSelector(state => state.user.error);
  const auth = useSelector(state => state.firebase.auth.uid);
  // const userProfile = useSelector(state => state.firebase.profile);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorPokemonApi || errorUser) {
      dispatch({
        type: 'CLEAN_ERRORS'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <SEO description="PokéFav, a place to gather your favorite Pokémons, create a ideal Pokémon Team, play PokéMinigames, explore Pokémon Cards and more!" />

      <ScrollToTop />
      <ScrollingWrapper />
      <ToastProvider />
      <Grid
        minHeight="100vh"
        gridTemplateRows={auth ? 'auto 1fr auto' : 'auto 1fr'}
      >
        {auth /* && auth.emailVerified */ ? (
          <NavigationBar />
        ) : (
          auth &&
          !auth.emailVerified && (
            <Flex
              p={[8, 10]}
              px={[8, null, 20]}
              w="100%"
              as="nav"
              flexDir="row"
              justify="center"
              align="center"
            >
              <Link to="/">
                <Image
                  h={10}
                  objectFit="contain"
                  alt="Pokéfav"
                  src="/img/logo/pokefav-full-title.svg"
                />
              </Link>
            </Flex>
          )
        )}
        {isLoadingPokemonApi || isLoadingUserApi ? (
          <Loading />
        ) : errorPokemonApi || errorUser ? (
          <Error error={errorPokemonApi || errorUser} />
        ) : (
          /* auth && !auth.emailVerified ? (
          <MainContainer
            display="flex"
            maxW={auth ? ['90%', '90%', '80%'] : '100%'}
            py={auth ? [6, 10, 12] : 0}
          >
            <VerifyEmail />
          </MainContainer>
        ) : */ <MainContainer
            maxW={auth ? ['90%', '90%', '80%'] : '100%'}
            py={auth ? [6, 10, 12] : 0}
            px={0}
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
  );
};

export default App;
