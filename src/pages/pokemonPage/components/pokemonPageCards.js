import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getCards, getCardsRarities } from 'redux/actions/pokemonCardsActions';

import {
  Flex,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Image,
  Box
} from '@chakra-ui/react';
import Select from 'react-select';
import { FaPlus } from 'react-icons/fa';

import Button from 'components/layout/Button';
import Error from 'components/feedback/Error';
import Loading from 'components/feedback/Loading';
import useWindowSize from 'utils/hooks/useWindowSize';

const PokemonPageCards = ({ pokemon }) => {
  const dispatch = useDispatch();
  const pokeCardsApiReducer = useSelector(
    state => state.pokemonCardsApi,
    shallowEqual
  );

  let {
    isLoadingCardsData,
    errorCardsData,
    cardsData,
    page,
    isLoadingNextPage,
    errorNextPage,
    rarities,
    isLoadingRarities,
    errorRarities
  } = pokeCardsApiReducer;

  const { width } = useWindowSize();
  console.log(width);
  const [state, setState] = useState({
    isLoading: false,
    error: null,
    cards: [],
    cardsShown: 6
  });

  const [selectState, setSelectState] = useState({
    selectFilter: { value: 'releasedAt', label: 'Release date' },
    selectFilterOrder: { value: 'desc', label: 'Descendant' },
    selectRarity: null,
    selectFilterOptions: [
      { value: 'releasedDate', label: 'Release date' },
      { value: 'price', label: 'Price' },
      { value: 'rarity', label: 'Rarity' }
    ],
    selectFilterOrderOptions: [
      { value: 'asc', label: 'Ascendant' },
      { value: 'desc', label: 'Descendant' }
    ],
    selectRarityOptions: rarities || null
  });

  useEffect(() => {
    const getWidth = window.innerWidth;

    if (cardsData?.length === 0 || cardsData[0]?.name !== pokemon) {
      dispatch(
        getCards(
          pokemon,
          null,
          '-releasedDate',
          1,
          getWidth >= 1920 ? 12 : getWidth > 1024 ? 10 : 6
        )
      );
    }

    setState({
      ...state,
      cardsShown: getWidth >= 1920 ? 12 : getWidth > 1024 ? 10 : 6
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState({
      ...state,
      cardsShown: width >= 1920 ? 12 : width > 1024 ? 10 : 6
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const handleSelectChange = async (select, action) => {
    setState({
      ...state,
      isLoading: true
    });

    if (action.name === 'cardsFilters') {
      setSelectState({
        ...selectState,
        selectFilter: select
      });

      dispatch(
        getCards(pokemon, selectState.rarity, '-', page, state.cardsShown)
      );
    }
    if (action.name === 'rarities') {
      dispatch(getCardsRarities());

      setSelectState({
        ...selectState,
        rarity: select
      });

      dispatch(
        getCards(
          pokemon,
          selectState.rarity,
          selectState.selectFilterOrder === 'desc'
            ? `-${selectState.selectFilter}`
            : selectState.selectFilter,
          page,
          state.cardsShown
        )
      );
    } else {
      setSelectState({
        ...selectState,
        selectFilterOrder: select
      });

      dispatch(
        getCards(
          pokemon,
          selectState.rarity,
          selectState.selectFilterOrder === 'desc'
            ? `-${selectState.selectFilter}`
            : selectState.selectFilter,
          page,
          state.cardsShown
        )
      );
    }
  };

  console.log(cardsData, state);

  return isLoadingCardsData ? (
    <Loading />
  ) : errorCardsData ? (
    <Error />
  ) : (
    <>
      <Wrap pb={8} justify="center" align="center">
        <WrapItem w="44">
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
              size="lg"
              name="cardsFilters"
              onChange={handleSelectChange}
              value={selectState.selectFilter}
              options={selectState.selectFilterOptions}
              placeholder="method to sort by"
              isSearchable={false}
            />
          </FormControl>
        </WrapItem>
        {selectState.rarity && (
          <WrapItem w="44">
            <FormControl id="sort-rarity">
              <FormLabel>Rarity</FormLabel>
              <Select
                isLoading={isLoadingRarities}
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
                name="raritySelect"
                isDisabled={errorRarities}
                value={!errorRarities ? selectState.selectRarity : null}
                onChange={handleSelectChange}
                options={
                  !errorRarities ? selectState.selectRarityOptions : null
                }
                placeholder={
                  errorRarities
                    ? "couldn't fetch rarities"
                    : 'rarity to sort by'
                }
                isSearchable={false}
              />
            </FormControl>
          </WrapItem>
        )}
        <WrapItem w="44">
          <FormControl id="sort-order">
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
              name="cardsFiltersOrders"
              value={selectState.selectFilterOrder}
              onChange={handleSelectChange}
              options={selectState.selectFilterOrderOptions}
              placeholder="order to sort by"
              isSearchable={false}
            />
          </FormControl>
        </WrapItem>
      </Wrap>
      <Flex flexWrap="wrap" gridGap={8} justify="center">
        {cardsData.map((item, index) => (
          <Flex align="center" justify="center" key={index}>
            <Image
              boxShadow="md"
              w="200px"
              h="100%"
              transition="ease-in-out all 0.4s"
              src={item.images.large}
              _hover={{ transform: 'scale(1.05)', cursor: 'pointer' }}
              _active={{ transform: 'scale(1.05)', cursor: 'pointer' }}
            />
          </Flex>
        ))}
        {isLoadingNextPage && (
          <Box pt={4}>
            <Loading size="" />
          </Box>
        )}
        {errorNextPage && (
          <Box pt={4}>
            <Error
              size="100px"
              direction="row"
              message="Ops! Couldn't fetch the next cards in the list"
            />
          </Box>
        )}
      </Flex>
      <Flex justify="center" pt={10}>
        <Button
          onClick={() =>
            dispatch(
              getCards(
                pokemon,
                selectState.rarity,
                selectState.selectFilterOrder === 'desc'
                  ? `-${selectState.selectFilter}`
                  : selectState.selectFilter,
                page++,
                state.cardsShown
              )
            )
          }
          isDisabled={errorNextPage}
          leftIcon={<FaPlus />}
          colorScheme="blue"
        >
          Show more
        </Button>
      </Flex>
    </>
  );
};

export default PokemonPageCards;
