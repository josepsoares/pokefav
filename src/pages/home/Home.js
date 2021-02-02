import React from 'react'
import { useSelector } from 'react-redux'
import StaticHome from './components/StaticHome'
import UserHome from './components/UserHome'

const Home = () => {
  const auth = useSelector(state => state.firebase.auth)
  return !auth.uid ? <StaticHome /> : <UserHome />
}

export default Home
