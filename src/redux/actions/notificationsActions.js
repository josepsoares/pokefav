import array from 'lodash/array'

export const getNotifications = () => {
    return (dispatch, { getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('notifications').get()
            .then(content => {
                var returnContent = []
                content.docs.map(doc => returnContent.push(doc.data()))
                dispatch({ type: 'GET_NOTIFICATIONS_SUCCESS', payload: returnContent })
            }).catch((error) => {
                dispatch({ type: 'GET_NOTIFICATIONS_ERROR', payload: error })
            })
    }
}

export const likeNotification = (notificationID, reactionType) => {
    return (dispatch, getState, { getFirestore }) => {
        dispatch({ type: 'LIKE_REQUEST_START' });
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profile = getState().firebase.profile;
        firestore.collection("users").doc(uid).update({
            notificationLikes: profile.notificationLikes.concat({
                id: notificationID,
                type: reactionType
            })
        }).then(() => {
            firestore.collection('notifications').doc(notificationID).get()
                .then(doc => {
                    const data = doc.data();
                    return firestore.collection("notifications").doc(notificationID).update({
                        reactions: {
                            ...data.reactions,
                            [reactionType]: data.reactions[reactionType] += 1
                        }
                    })
                }).then(() => dispatch({ type: 'LIKE_NOTIFICATION_SUCCESS' }))
                .catch(() => dispatch({ type: 'LIKE_NOTIFICATION_ERROR' }))
        }).catch(() => dispatch({ type: 'LIKE_NOTIFICATION_ERROR' }))
    }
}

export const dislikeNotification = (notificationID, reactionType) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profile = getState().firebase.profile;
        array.remove(profile.notificationLikes, (item) => {
            return item.id === notificationID;
        });
        firestore.collection("users").doc(uid).update({
            notificationLikes: profile.notificationLikes
        }).then(() => {
            firestore.collection('notifications').doc(notificationID).get()
                .then(doc => {
                    const data = doc.data();
                    return firestore.collection("notifications").doc(notificationID).update({
                        reactions: {
                            ...data.reactions,
                            [reactionType]: data.reactions[reactionType] -= 1
                        }
                    })
                }).then(() => dispatch({ type: 'DISLIKE_NOTIFICATION_SUCCESS' }))
                .catch(() => dispatch({ type: 'DISLIKE_NOTIFICATION_ERROR' }))
        }).catch(() => dispatch({ type: 'DISLIKE_NOTIFICATION_ERROR' }))
    }
}

export const removeReactionsNotification = () => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_REACTION_FEEDBACK' })
    }
}