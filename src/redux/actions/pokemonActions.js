export const getInfoPokemonPage = (pokemon, pokemonName) => async dispatch => {
  console.log(pokemon)
  dispatch({ type: 'API_REQUEST_START' })

  const urls = [
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
  ]

  try {
    const pokemonData = await Promise.all(
      urls.map(async url => {
        const pokemonInfo = await fetch(url)
        return await pokemonInfo.json()
      })
    )

    dispatch({ type: 'POKEMONINFO_DATA_SUCCESS', payload: pokemonData })

    const arrayAlternateForms = []
    for (let item of pokemonData[1].varieties) {
      if (!item.is_default) {
        arrayAlternateForms.push(item.pokemon.url)
      }
    }

    if (arrayAlternateForms.length !== 0) {
      const pokemonAlternateForms = await Promise.all(
        arrayAlternateForms.map(async url => {
          const alternateForm = await fetch(url)
          return await alternateForm.json()
        })
      )

      dispatch({
        type: 'POKEMONINFO_ALTERNATEFORM_DATA_SUCCESS',
        payload: pokemonAlternateForms
      })
    } else {
      dispatch({
        type: 'POKEMONINFO_ALTERNATEFORM_DATA_SUCCESS',
        payload: null
      })
    }

    const pokemonEvChain = await fetch(pokemonData[1].evolution_chain.url)
    const pokemonEvChainData = await pokemonEvChain.json()

    dispatch({
      type: 'POKEMONINFO_EVOLUTION_DATA_SUCCESS',
      payload: pokemonEvChainData
    })
  } catch (err) {
    dispatch({ type: 'POKEMONINFO_DATA_ERROR', error: err })
  }

  // https://api.pokemontcg.io/v2/cards?q=name:charizard%20(subtypes:mega%20OR%20subtypes:vmax)&orderBy=-number

  try {
    const cards = await fetch(
      `https://api.pokemontcg.io/v2/cards?name=${pokemonName}`
    )
    const cardsData = await cards.json()
    dispatch({
      type: 'POKEMONCARDS_DATA_SUCCESS',
      payload: cardsData.cards
    })
  } catch (err) {
    dispatch({ type: 'POKEMONCARDS_DATA_ERROR', error: err })
  }

  dispatch({ type: 'API_REQUEST_END' })
}

export const getRegionsAndGames = () => dispatch => {
  dispatch({ type: 'API_REQUEST_START' })
  const urls = [
    `https://pokeapi.co/api/v2/version-group/`,
    `https://pokeapi.co/api/v2/region/`
  ]

  Promise.all(
    urls.map(url =>
      fetch(url).then(async response => {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json)
        })
      })
    )
  )
    .then(async data => {
      dispatch({ type: 'SIGNUP_DATA_SUCCESS', payload: data })
    })
    .catch(error => dispatch({ type: 'SIGNUP_DATA_ERROR', error: error }))
}

export const getPokedexAct = region => async dispatch => {
  dispatch({ type: 'API_REQUEST_START' })

  try {
    const requestPokedex = await fetch()
    const requestData = await requestPokedex.json()

    console.log(requestData)

    dispatch({
      type: 'POKEDEX_DATA_SUCCESS',
      payload: requestData.pokemon_entries
    })
  } catch (err) {
    dispatch({ type: 'POKEDEX_DATA_ERROR', error: err })
  }
}

export const getDataPokeListPage = () => async dispatch => {
  dispatch({ type: 'API_REQUEST_START' })
  const urls = [
    `https://pokeapi.co/api/v2/pokedex/`,
    `https://pokeapi.co/api/v2/type/`,
    `https://pokeapi.co/api/v2/pokedex/national`
  ]

  try {
    const pokeListInitialData = await Promise.all(
      urls.map(async url => {
        const requestData = await fetch(url)
        return await requestData.json()
      })
    )

    console.log(pokeListInitialData)

    dispatch({
      type: 'POKELIST_PAGE_DATA_SUCCESS',
      payload: {
        regions: pokeListInitialData[0].results,
        types: pokeListInitialData[1].results,
        pokedex: pokeListInitialData[2].pokemon_entries
      }
    })
  } catch (err) {
    dispatch({ type: 'POKELIST_PAGE_DATA_ERROR', error: err })
  }
}