import React, { useState } from 'react';
import { connect } from 'react-redux'
import { removeAuthNotification } from '../store/actions/authActions'
import { removeFavoritesNotification } from '../store/actions/favoriteActions'
import { removeFriendsNotification } from '../store/actions/friendsActions'
import { removeReactionsNotification } from '../store/actions/notificationsActions'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Collapse from '@material-ui/core/Collapse';

const AlertComponent = props => {
    const [open, setOpen] = useState(true);
    const { message, typeAlert, removeAuthNotification, removeFavoritesNotification, removeFriendsNotification, removeReactionsNotification } = props

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    setTimeout(() => {
        removeAuthNotification();
        removeFavoritesNotification();
        removeFriendsNotification();
        removeReactionsNotification();
    }, 3000)

    setTimeout(() => {
        setOpen(false)
    }, 2000)

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            open={true}
        >
            <Collapse in={open}>
                <Alert severity={typeAlert}>
                    {message}
                </Alert>
            </Collapse>
        </Snackbar>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeAuthNotification: () => dispatch(removeAuthNotification()),
        removeFavoritesNotification: () => dispatch(removeFavoritesNotification()),
        removeFriendsNotification: () => dispatch(removeFriendsNotification()),
        removeReactionsNotification: () => dispatch(removeReactionsNotification()),
    }
}

export default connect(null, mapDispatchToProps)(AlertComponent);
