import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import {
  Flex,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Image
} from '@chakra-ui/react'
import Button from 'components/layout/Button'
import { FaPlus } from 'react-icons/fa'
import useWindowSize from 'utils/hooks/useWindowSize'
import { getCards } from 'redux/actions/pokemonCardsActions'

const genericOptions = [
  { value: 'asc', label: 'Ascendant' },
  { value: 'desc', label: 'Descendant' }
]

const rarityOptions = [
  { value: 'createdAt', label: 'Creation date' },
  { value: 'username', label: 'Username' },
  { value: 'triviaPokemon', label: 'Minigames score' }
]

const releaseOptions = genericOptions
const hpOptions = genericOptions
const priceOptions = genericOptions

const PokemonPageCards = ({ pokemon }) => {
  const dispatch = useDispatch()
  const { width } = useWindowSize()
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    cards: [],
    cardsShown: 6
  })

  const [selectState, setSelectState] = useState({
    selectFilter: { value: 'releasedAt', label: 'Release date' },
    selectFilterType: { value: 'desc', label: 'Descendant' },
    selectFilterOptions: [
      { value: 'hp', label: 'HP' },
      { value: 'releasedAt', label: 'Release date' },
      { value: 'price', label: 'Price' },
      { value: 'rarity', label: 'Rarity' }
    ]
  })

  useEffect(() => {
    setState({
      ...state,
      cardsShown: width > 1024 ? 10 : 6
    })
  }, [])

  const handleSelectChange = async (value, action) => {
    setState({
      ...state,
      isLoading: true
    })

    if (action.name === 'cardsFilters') {
      const getPokedexByRegion = await getPokedex('national', 'region')
      const pokedexEntriesSlice = getPokedexByRegion.allPokedexEntries.slice(
        0,
        808
      )

      dispatch(getCards())

      setState({
        ...state,
        currentIndex: 1,
        items: getPokedexByRegion.items,
        allPokedexEntries: pokedexEntriesSlice,
        typeSearch: value.value,
        selectList: regions,
        selectValue: 'national',
        isLoading: false
      })

      dispatch(getCards())
    } else {
      const getPokemons = await getPokedex(value.value, state.typeSearch)
      let filterAllPokedexEntries

      if (typeSearch === 'type') {
        filterAllPokedexEntries = getPokemons.allPokedexEntries.filter(item => {
          if (item.slot !== 2) {
            const splitUrl = item.pokemon.url.split('/')
            return splitUrl[6] < 808
          } else {
            return false
          }
        })
      } else if (value.value === 'national') {
        filterAllPokedexEntries = getPokemons.allPokedexEntries.slice(0, 808)
      } else {
        filterAllPokedexEntries = getPokemons.allPokedexEntries
      }

      const getItems = calculatePage(filterAllPokedexEntries, 1)

      setState({
        ...state,
        currentIndex: 1,
        items: getItems,
        allPokedexEntries: filterAllPokedexEntries,
        selectValue: value.value,
        isLoading: false
      })
    }
  }

  return (
    <>
      <Wrap>
        <WrapItem>
          <FormControl id="sort-by">
            <FormLabel>Sort By</FormLabel>
            <Select
              styles={{
                valueContainer: () => ({
                  padding: '0 1rem'
                }),
                control: provided => ({
                  ...provided,
                  '&:hover': {
                    borderColor: '#f88d87'
                  }
                })
              }}
              isFullWidth={true}
              size="md"
              name="cardsFilters"
              onChange={handleSelectChange}
              value={selectState.selectFilter}
              options={selectState.selectFilterOptions}
              placeholder="method to sort by"
              isSearchable={false}
            />
          </FormControl>
        </WrapItem>
        <WrapItem>
          <FormControl id="sort-by">
            <FormLabel>Sort By</FormLabel>
            <Select
              styles={{
                valueContainer: () => ({
                  padding: '0 1rem'
                }),
                control: provided => ({
                  ...provided,
                  '&:hover': {
                    borderColor: '#f88d87'
                  }
                })
              }}
              isFullWidth={true}
              size="md"
              name="cardsFiltersOrderOrExtras"
              value={{
                value: typeSearch,
                label: _.startCase(typeSearch)
              }}
              onChange={handleSelectChange}
              options={[
                { label: 'Region', value: 'region' },
                { label: 'Type', value: 'type' }
              ]}
              placeholder="method to sort by"
              isSearchable={false}
            />
          </FormControl>
        </WrapItem>
      </Wrap>
      <Flex flexWrap="wrap" gridGap={8} justify="center">
        {cards.map((item, index) => (
          <Flex align="center" justify="center" key={index}>
            <Image
              boxShadow="md"
              w="70%"
              h="auto"
              transition="ease-in-out all 0.4s"
              src={item.imageUrl}
              _hover={{ transform: 'scale(1.05)' }}
              _active={{ transform: 'scale(1.05)' }}
            />
          </Flex>
        ))}
      </Flex>
      <Flex justify="center" pt={10}>
        {cards.length !== pokemonCards.length && (
          <Button
            onClick={() =>
              this.setState({
                cards: cards.concat(
                  pokemonCards.slice(cards.length, cards.length + cardsShown)
                )
              })
            }
            leftIcon={<FaPlus />}
            colorScheme="blue"
          >
            Show more
          </Button>
        )}
      </Flex>
    </>
  )
}

export default PokemonPageCards
