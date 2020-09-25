import './styles/App.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Transition, animated } from 'react-spring/renderprops';
// Pages
import Home from './pages/home/Home'
import PokemonList from "./pages/PokemonList";
import PokemonPage from "./pages/pokemonPage/PokemonPage";
import PokemonTrainers from './pages/PokemonTrainers';
import PokemonTrivia from "./pages/pokemonTrivia/PokemonTrivia";
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import RecoverPassword from './pages/auth/RecoverPassword';
// Components
import Layout from "./components/Layout";
import ScrollingWrapper from './components/ScrollingWrapper';
import NavigationBar from "./components/navbar/Navbar";
import Loading from './components/Loading';
import Error from './components/Error';
import Notification from './components/Notification';
import NoMatch from './components/NoMatch';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const AnimatedRoute = ({ children }) => (
  <Route
    render={({ location }) => (
      <Transition
        native
        items={location}
        keys={location => location.pathname}
        from={{ position: 'absolute', opacity: 0, minHeight: "65vh" }}
        enter={{ position: 'static', opacity: 1, minHeight: "65vh", display: 'block' }}
        leave={{ position: 'absolute', opacity: 0, minHeight: "0", display: 'none' }}>
        {location => style => <animated.div style={style}>{children(location)}</animated.div>}
      </Transition>
    )}
  />
)

class App extends Component {
  render() {
    const { errorApi, isLoading, profile, authNotifications, favoritesNotifications, friendsNotifications, reactionsNotifications } = this.props;

    if (!profile) {
      return (
        <Router>
          <Loading height={'100vh'} />
        </Router>
      )
    } else {
      return (
        <Router>
          <ScrollToTop />
          <NavigationBar />
          <Layout>
            <ScrollingWrapper>
              {authNotifications &&
                <Notification message={authNotifications[0]} typeAlert={authNotifications[1]} />}
              {favoritesNotifications &&
                <Notification message={favoritesNotifications[0]} typeAlert={favoritesNotifications[1]} />}
              {friendsNotifications &&
                <Notification message={friendsNotifications[0]} typeAlert={friendsNotifications[1]} />}
              {reactionsNotifications &&
                <Notification message={reactionsNotifications[0]} typeAlert={reactionsNotifications[1]} />}
              {isLoading ? (<Loading height={'60vh'} />) : errorApi ? (<Error error={errorApi} />) : (
                <AnimatedRoute>
                  {location => (
                    <Switch location={location}>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/pokemon-list/:search" component={PokemonList} />
                      <Route exact path="/pokemon-list/:search/pokemon-page/:pokemon" component={PokemonPage} />
                      <Route exact path="/pokemon-trivia" component={PokemonTrivia} />
                      <Route exact path="/pokemon-trainers" component={PokemonTrainers} />
                      <Route exact path="/pokemon-trainers/profile/:username" component={Profile} />
                      <Route exact path="/profile/:username" component={Profile} />
                      <Route exact path="/profile/edit/:username" component={EditProfile} />
                      <Route exact path="/sign-up" component={SignUp} />
                      <Route exact path="/sign-in" component={SignIn} />
                      <Route exact path="/sign-in/recover-password" component={RecoverPassword} />
                      <Route component={NoMatch} />
                    </Switch>
                  )}
                </AnimatedRoute>)}
              <Footer />
            </ScrollingWrapper>
          </Layout>
        </Router>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    errorApi: state.apiCalls.error,
    isLoading: state.apiCalls.isLoading,
    auth: state.firebase.auth,
    authNotifications: state.auth.actionAuthFeedback,
    favoritesNotifications: state.favorite.actionFavoritesFeedback,
    friendsNotifications: state.friends.actionFriendsFeedback,
    reactionsNotifications: state.notifications.actionReactionFeedback,
    profile: state.firebase.profile.isLoaded,
    profileContent: state.firebase.profile
  }
}

export default connect(mapStateToProps)(App)