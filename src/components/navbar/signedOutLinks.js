import React from 'react';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSignUpData } from '../../store/actions/apiActions';

const signedOutLinks = (props) => {
    return (
        <>
            <NavItem>
                <NavLink
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-in">
                    Login
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={props.getSignUpData}
                    activeClassName="navbar__link-active" className="navbar__link" to="/sign-up">
                    Register
                </NavLink>
            </NavItem>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSignUpData: () => dispatch(getSignUpData())
    }
}

export default connect(null, mapDispatchToProps)(signedOutLinks);
