import React from 'react'
import { connect } from 'react-redux'
import {
  likeNotification,
  dislikeNotification
} from 'redux/actions/notificationsActions'

import { Button, Image, Wrap, WrapItem } from '@chakra-ui/react'

const ReactionIcons = props => {
  const {
    notificationItem,
    profile,
    likeNotification,
    dislikeNotification
  } = props
  const { id } = notificationItem
  const reactions = ['psyduck', 'pikachu', 'zubat', 'caterpie', 'mankey']

  return (
    <Wrap spacing="30px">
      {reactions.map((item, key) => {
        let checkIfLiked = false
        const checkNotification = profile?.notificationLikes.find(
          element => element.id === id
        )
        const checkTypeNotification = profile?.notificationLikes.find(
          element => element.id === id && element.type === item
        )
        if (checkTypeNotification !== undefined) {
          checkIfLiked = true
        }

        return (
          <WrapItem key={key}>
            <Button
              py={2}
              px={4}
              leftIcon={
                <Image mr={2} alt={item} src={`/img/reactions/${item}.png`} />
              }
              size="medium"
              variant="outline"
              color="primary"
              disabled={
                checkNotification && !checkTypeNotification ? true : false
              }
              className={
                checkIfLiked ? `reactionBtnActive` : `reactionBtnDisabled`
              }
              onClick={() => {
                if (checkIfLiked) {
                  dislikeNotification(id, item)
                } else if (!checkIfLiked) {
                  likeNotification(id, item)
                }
              }}
            >
              {notificationItem.reactions[item]}
            </Button>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    likeNotification: (notificationID, reactionType) =>
      dispatch(likeNotification(notificationID, reactionType)),
    dislikeNotification: (notificationID, reactionType) =>
      dispatch(dislikeNotification(notificationID, reactionType))
  }
}

export default connect(null, mapDispatchToProps)(ReactionIcons)
