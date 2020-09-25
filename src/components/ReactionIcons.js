import React from 'react';
import { connect } from 'react-redux';
import Button  from '@material-ui/core/Button';
import { likeNotification, dislikeNotification } from '../store/actions/notificationsActions'

const ReactionIcons = props => {
    const { notificationItem, profile, likeNotification, dislikeNotification } = props
    const { id } = notificationItem
    const reactions = ['psyduck', 'pikachu', 'zubat', 'caterpie', 'mankey']

    return (
        <div className='col-12 d-flex justify-content-center'>
            {reactions.map((item, key) => {
                let checkIfLiked = false
                const checkNotification = profile.notificationLikes.find(element => element.id === id)
                const checkTypeNotification = profile.notificationLikes.find(element =>
                    element.id === id && element.type === item)
                if (checkTypeNotification !== undefined) {
                    checkIfLiked = true
                }

                console.log(checkNotification)
                console.log(checkTypeNotification)

                return (
                    <Button size="medium" variant="outlined" color='primary' key={key} disabled={(checkNotification && !checkTypeNotification) ? true : false}
                        className={`${checkIfLiked ? `reactionBtnActive` : `reactionBtnDisabled`} text-center mx-2`}
                        onClick={() => {
                            if (checkIfLiked) {
                                dislikeNotification(id, item)
                            } else if (!checkIfLiked) {
                                likeNotification(id, item)
                            }
                        }}
                    >
                        <img alt={item} src={require(`../assets/imgs/${item}.png`)} />
                        <span className='mx-2' style={{ fontSize: '100%', color: '#1688b9' }}>
                            {notificationItem.reactions[item]}
                        </span>
                    </Button>
                )
            })}
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeNotification: (notificationID, reactionType) => dispatch(likeNotification(notificationID, reactionType)),
        dislikeNotification: (notificationID, reactionType) => dispatch(dislikeNotification(notificationID, reactionType))
    }
}

export default connect(null, mapDispatchToProps)(ReactionIcons)
