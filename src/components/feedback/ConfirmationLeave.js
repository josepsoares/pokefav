import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay
} from '@chakra-ui/react'
import Button from 'components/layout/Button'
import React, { useEffect, useState } from 'react'
import { Prompt, useHistory } from 'react-router-dom'

const ConfirmationLeave = ({
  didOpen,
  closeFunc,
  proceedFunc,
  title,
  description,
  when,
  shouldBlockNavigation
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [lastLocation, setLastLocation] = useState(null)
  const [confirmedNavigation, setConfirmedNavigation] = useState(false)
  const history = useHistory()

  const closeModal = () => {
    setModalVisible(false)

    if (closeFunc) {
      closeFunc()
    }
  }

  const handleBlockedNavigation = nextLocation => {
    console.log(nextLocation)
    console.log(shouldBlockNavigation, !confirmedNavigation)
    console.log(!confirmedNavigation && shouldBlockNavigation)
    if (!confirmedNavigation && shouldBlockNavigation) {
      console.log('???')
      setModalVisible(true)
      setLastLocation(nextLocation)
      return false
    } else {
      return true
    }
  }

  const handleConfirmNavigationClick = () => {
    setModalVisible(false)

    if (proceedFunc && didOpen) {
      proceedFunc()
    } else {
      setConfirmedNavigation(true)
    }
  }

  useEffect(() => {
    console.log(confirmedNavigation, lastLocation)
    if (confirmedNavigation && lastLocation) {
      console.log('!!!')
      history.push(lastLocation.pathname)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmedNavigation, lastLocation])

  useEffect(() => {
    if (didOpen) {
      setModalVisible(true)
    }
  }, [didOpen])

  console.log(when)

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <AlertDialog
        isCentered
        motionPreset="scale"
        isOpen={modalVisible}
        closeOnEsc={true}
        blockScrollOnMount={false}
        closeOnOverlayClick={true}
        scrollBehavior="inside"
        onClose={closeModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent color="#3c3c3b" bgColor="#ebebd3" p={3}>
            <AlertDialogHeader as="h3">{title}</AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="transparent" onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleConfirmNavigationClick()}
                ml={3}
              >
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ConfirmationLeave
