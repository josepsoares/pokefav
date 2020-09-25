import React from 'react';
import { connect } from 'react-redux';
import StaticHome from './StaticHome';
import UserHome from './UserHome';

const Home = (props) => {
    let { auth } = props
    return !auth.uid ? (<StaticHome />) : (<UserHome />)
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Home)