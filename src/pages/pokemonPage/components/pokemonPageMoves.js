import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import {
  Box,
  Flex,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  Heading
} from '@chakra-ui/react'

import Loading from 'components/feedback/Loading'
import Error from 'components/feedback/Error'
import Button from 'components/layout/Button'

const PokemonPageMoves = props => {
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    move: null,
    moveConditions: null
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLoading, error, move, moveConditions } = state
  const { pokemonMoves, method } = props
  const orderedMovesArray = []

  for (var itemMove of pokemonMoves) {
    for (let itemMoveSpecifics of itemMove.version_group_details) {
      itemMoveSpecifics.version_group.name === `ultra-sun-ultra-moon` &&
        itemMoveSpecifics.move_learn_method.name === `${method}` &&
        orderedMovesArray.push({
          name: itemMove.move.name,
          level_learned_at: itemMoveSpecifics.level_learned_at
        })
    }
    method === 'level-up' &&
      orderedMovesArray.sort((a, b) => a.level_learned_at - b.level_learned_at)
  }

  useEffect(() => {
    if (move) {
      setState({
        ...state,
        moveConditions: [
          [move.meta.crit_rate, 'Crit Chance', 0],
          [move.meta.flinch_chance, 'Flinch Chance', 0],
          [move.priority, 'Priority', 0],
          [move.meta.stat_chance, 'Status Chance', 0],
          [move.meta.max_hits, 'Max Hits', null],
          [move.meta.max_turns, 'Max Turns', null],
          [move.meta.min_hits, 'Min Hits', null],
          [move.meta.min_turns, 'Min Turns', null],
          [move.meta.drain, 'Drain Amount', 0],
          [move.meta.healing, 'Healing Amount', 0]
        ]
      })
    }
  }, [state.move])

  const _getSpecificMove = async move => {
    setState({ ...state, isLoading: true })
    try {
      const request = await fetch(`https://pokeapi.co/api/v2/move/${move}/`)
      const data = await request.json()
      setState({ ...state, isLoading: false, move: data })
    } catch (err) {
      setState({ ...state, isLoading: false, error: err })
    }
  }

  const _printConditionMove = (key, firstName, firstString, firstCondition) => {
    if (firstName !== firstCondition) {
      return (
        <Box key={key}>
          <h5>{firstString}</h5>
          <Text>
            {firstName}
            {firstCondition !== 0 && '%'}
          </Text>
        </Box>
      )
    }
  }

  const _printMoveModal = () => {
    const moveName = move?.names.find(item => item.language.name === 'en')
    const generationName = move?.generation?.name?.split('-')
    const moveDescription = move?.flavor_text_entries.find(
      item => item.language.name === 'en'
    )

    return (
      <Modal
        size="lg"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        scrollBehavior="inside"
      >
        <ModalOverlay>
          <ModalContent color="#3c3c3b" bgColor="#ebebd3">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <Error error={error} />
            ) : (
              move && (
                <>
                  <ModalHeader>
                    <Heading pb={2} as="h3">
                      {moveName.name}
                    </Heading>
                    {move?.generation && (
                      <Text
                        fontSize={16}
                        fontStyle="italic"
                        fontWeight="normal"
                      >
                        Introduced in {_.startCase(generationName[0])}{' '}
                        {_.upperCase(generationName[1])}
                      </Text>
                    )}
                  </ModalHeader>

                  <ModalCloseButton />
                  <ModalBody>
                    <Heading fontSize={24} as="h5">
                      Description
                    </Heading>
                    <Text>{moveDescription.flavor_text}</Text>
                    <SimpleGrid pt={8} gridGap={4} columns={[1, 2, 3]}>
                      <Box>
                        <h5>Type</h5>
                        <Box
                          className={`typeIcon type-${move.type.name}`}
                          sx={{ margin: '0 !important' }}
                          color="white"
                        >
                          {move.type.name}
                        </Box>
                      </Box>
                      <Box>
                        <h5>Power</h5>
                        {move.power === null ? (
                          <p>None</p>
                        ) : (
                          <p>{move.power}</p>
                        )}
                      </Box>

                      <Box>
                        <h5>PP</h5>
                        <p>{move.pp}</p>
                      </Box>
                      <Box>
                        <h5>Accuracy</h5>
                        {move.accuracy === null ? (
                          <p>100%</p>
                        ) : (
                          <p>{move.accuracy}%</p>
                        )}
                      </Box>
                      <Box>
                        <h5>Move Class</h5>
                        <p>{_.startCase(move.damage_class.name)}</p>
                      </Box>
                      <Box>
                        <h5>Priority</h5>
                        <p>{move.priority}</p>
                      </Box>
                      <Box>
                        <h5>Target</h5>
                        <p>{_.startCase(move.target.name)}</p>
                      </Box>
                      {moveConditions &&
                        moveConditions.map((item, key) =>
                          _printConditionMove(key, item[0], item[1], item[2])
                        )}
                    </SimpleGrid>
                  </ModalBody>
                </>
              )
            )}
            <ModalFooter w="100%" justifyContent="center">
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    )
  }

  if (orderedMovesArray.length) {
    return (
      <>
        {method === 'level-up' ? (
          <SimpleGrid p={3} columns={[1, 2]}>
            {orderedMovesArray.map((moveItem, key) => (
              <Flex p={3} flexDir="column" key={key}>
                <Button
                  variant="ghost"
                  display="flex"
                  flexDir="row"
                  onClick={() => {
                    _getSpecificMove(moveItem.name)
                    onOpen()
                  }}
                >
                  {moveItem.level_learned_at === 0 ? (
                    <Text>
                      Starts with {_.startCase(moveItem.name)} at base lvl
                    </Text>
                  ) : (
                    <Text>
                      Learns {_.startCase(moveItem.name)} at lvl{' '}
                      {moveItem.level_learned_at}
                    </Text>
                  )}
                </Button>
              </Flex>
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid p={3} columns={[1, 2, 3]}>
            {orderedMovesArray.map((moveItem, key) => (
              <Button
                key={key}
                variant="ghost"
                boxShadow="none"
                onClick={() => {
                  _getSpecificMove(moveItem.name)
                  onOpen()
                }}
                _hover={{
                  color: 'blue.500',
                  bgColor: 'yellow.300'
                }}
                _active={{
                  color: 'blue.500',
                  bgColor: 'yellow.300'
                }}
              >
                {_.startCase(moveItem.name)}
              </Button>
            ))}
          </SimpleGrid>
        )}
        {_printMoveModal()}
      </>
    )
  } else {
    return (
      <Text py={4}>
        There weren't found any moves that this pokémon can learn by this method
      </Text>
    )
  }
}

export default PokemonPageMoves
