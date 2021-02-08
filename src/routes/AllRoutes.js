import Home from 'pages/home/Home'
import PokemonList from 'pages/PokemonList'
import PokemonPage from 'pages/pokemonPage/PokemonPage'
import PokemonTrainers from 'pages/PokemonTrainers'
import Profile from 'pages/Profile'
import PokemonTrivia from 'pages/pokemonTrivia/PokemonTrivia'
import Register from 'pages/auth/Register'
import Login from 'pages/auth/Login'
import RecoverPassword from 'pages/auth/RecoverPassword'

const communityRoutes = [
  {
    path: '/pokemon-trainers',
    name: 'Pokémon Trainers',
    Component: PokemonTrainers,
    isPrivate: true
  },
  {
    path: '/pokemon-trainers/profile/:username',
    name: 'Pokémon Trainer Profile',
    Component: Profile,
    isPrivate: true
  },
  {
    path: '/profile/:username',
    name: 'User Profile',
    Component: Profile,
    isPrivate: true
  }
]

const authRoutes = [
  {
    path: '/register',
    name: 'Register',
    Component: Register,
    isPrivate: false
  },
  { path: '/login', name: 'Login', Component: Login, isPrivate: false },
  {
    path: '/recover-password',
    name: 'Recover Password',
    Component: RecoverPassword,
    isPrivate: false
  }
]

const routes = [
  { path: '/', name: 'Home', Component: Home, isPrivate: false },
  {
    path: '/pokemon-list/',
    name: 'Pokémon List',
    Component: PokemonList,
    isPrivate: false
  },
  {
    path: '/pokemon-list/pokemon-page/:pokemon',
    name: 'Pokémon Page',
    Component: PokemonPage,
    isPrivate: false
  },
  {
    path: '/pokemon-trivia',
    name: 'Pokémon Trivia',
    Component: PokemonTrivia,
    isPrivate: true
  },
  ...communityRoutes,
  ...authRoutes
]

export default routes
