import React, { Component } from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { getAllUsers, getUserAndPokemonForProfileIQ } from '../../store/actions/apiActions';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class signedInLinks extends Component {

    state = { width: window.innerWidth }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
    }

    render() {
        const { getAllUsers, profileContent, signOut, getUserAndPokemonForProfileIQ } = this.props;
        const { width } = this.state
        const { username } = profileContent

        return (
            <>
                <NavItem>
                    <NavLink onClick={() => getAllUsers(username)}
                        activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trainers">
                        PokéTrainers
                </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact
                        activeClassName="navbar__link-active" className="navbar__link" to="/pokemon-trivia">
                        PokéTrivia
                </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        activeClassName="navbar__link-active"
                        onClick={() => getUserAndPokemonForProfileIQ(username)}
                        className="navbar__link" to={`/profile/${username}`} >
                        {width >= 768 ? <AccountCircleIcon /> : username}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        onClick={signOut} className="navbar__link" to="/">
                        <ExitToAppRoundedIcon />
                    </NavLink>
                </NavItem>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileContent: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        getAllUsers: (loggedUser) => dispatch(getAllUsers(loggedUser)),
        getUserAndPokemonForProfileIQ: (user) => dispatch(getUserAndPokemonForProfileIQ(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks)