import React from 'react'
import { useSelector } from 'react-redux'
import StaticHome from './components/StaticHome'
import UserHome from './components/UserHome'
import SEO from 'components/Seo'

const Home = () => {
  const auth = useSelector(state => state.firebase.auth)
  return (
    <>
      <SEO
        title="Home"
        description="PokéFav, a place to gather your favorite Pokémons, create a ideal Pokémon Team, play PokéTrivia, explore Pokémon Cards and more!"
      />
      {!auth.uid ? <StaticHome /> : <UserHome />}
    </>
  )
}

export default Home
