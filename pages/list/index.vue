<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import PokemonListItem from "~/components/pokemon-list-item.vue";
import { usePokemonListStore } from "~/stores/pokemon-list";

definePageMeta({
  title: "Pokémon List",
  description: "Search for your favorite pokémons in a vast list of Pokémons",
});

const debouncedFn = useDebounceFn(() => {
  // do something
}, 1000);

const isFilterSettingsOpen = ref(false);

const pokemonListStore = usePokemonListStore();

if (pokemonListStore.pokemons.length === 0) {
  // also fetch regions and types
  const { data } = await useFetch("/api/count", {
    query: { param2: "value2" },
    onResponse({ response }) {
      // Process the response data
      // localStorage.setItem("token", response._data.token);
      pokemonListStore.populatePokemons(response._data);
    },
  });

  if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
  }
}

/* 
   if (
                (typeSearch === 'region' &&
                  pokedexItem.pokemon_species !== undefined) ||
                (typeSearch === 'type' && pokedexItem.pokemon !== undefined)
              ) {
                const url =
                  pokedexItem.pokemon_species !== undefined
                    ? pokedexItem.pokemon_species.url.trim()
                    : pokedexItem.pokemon.url.trim();
                const pokemonNumber = url.split('/')[6];
                const pokemonName =
                  pokedexItem.pokemon_species !== undefined
                    ? pokedexItem.pokemon_species.name
                    : pokedexItem.pokemon.name;
                const pokemonNameEdited = _.startCase(pokemonName);

                if (pokemonNumber <= 808)

                  const getPokedex = async (param, param2) => {
    console.log(param2);
    const url =
      param2 === 'region'
        ? `https://pokeapi.co/api/v2/pokedex/${param}/`
        : `https://pokeapi.co/api/v2/type/${param}/`;

    try {
      const pokemonListRequest = await fetch(url);
      const pokemonListData = await pokemonListRequest.json();

      const setItems = calculatePage(pokemonListData.pokemon, 1);

      setState({ ...state, items: setItems, allPokedexEntries: pokemonsList });
    } catch (error) {
      setState({ ...state, error: error.message, isLoading: false });
    }
  };
  */

/* const handleSearchChange = event => {
    const { value } = event.target;
    const { allPokedexEntries } = state;

    if (value !== '') {
      var pokemon;
      var pokemonSearched = [];
      pokemon = value.toLowerCase();
      for (let pokedexItem of allPokedexEntries) {
        if (
          pokedexItem.pokemon_species.name.startsWith(pokemon) ||
          pokedexItem.pokemon_species.name.includes(pokemon)
        ) {
          pokemonSearched.push(pokedexItem);
        }
      }
      setState({
        ...state,
        items: calculatePage(pokemonSearched, 1),
        currentIndex: 1,
        searchPokemon: pokemonSearched
      });
    } else {
      setState({
        ...state,
        items: calculatePage(allPokedexEntries, 1),
        currentIndex: 1,
        searchPokemon: ''
      });
    }
  };

  const handleSelectChange = async (value, action) => {
    setState({
      ...state,
      isLoading: true
    });

    if (action.name === 'typeSearch') {
      if (value.value === 'region') {
        const getPokedexByRegion = await getPokedex('national', 'region');
        const pokedexEntriesSlice = getPokedexByRegion.allPokedexEntries.slice(
          0,
          808
        );

        setState({
          ...state,
          currentIndex: 1,
          items: getPokedexByRegion.items,
          allPokedexEntries: pokedexEntriesSlice,
          typeSearch: value.value,
          selectList: regions,
          selectValue: 'national',
          isLoading: false
        });
      } else {
        const getPokedexByType = await getPokedex('normal', 'type');

        let filterAllPokedexEntries = getPokedexByType.allPokedexEntries.filter(
          item => {
            if (item.slot !== 2) {
              const splitUrl = item.pokemon.url.split('/');
              return splitUrl[6] < 808;
            } else {
              return false;
            }
          }
        );

        setState({
          ...state,
          currentIndex: 1,
          items: calculatePage(filterAllPokedexEntries, 1),
          allPokedexEntries: filterAllPokedexEntries,
          typeSearch: value.value,
          selectList: types,
          selectValue: 'normal',
          isLoading: false
        });
      }
    } else {
      const getPokemons = await getPokedex(value.value, state.typeSearch);
      let filterAllPokedexEntries;

      if (typeSearch === 'type') {
        filterAllPokedexEntries = getPokemons.allPokedexEntries.filter(item => {
          if (item.slot !== 2) {
            const splitUrl = item.pokemon.url.split('/');
            return splitUrl[6] < 808;
          } else {
            return false;
          }
        });
      } else if (value.value === 'national') {
        filterAllPokedexEntries = getPokemons.allPokedexEntries.slice(0, 808);
      } else {
        filterAllPokedexEntries = getPokemons.allPokedexEntries;
      }

      const getItems = calculatePage(filterAllPokedexEntries, 1);

      setState({
        ...state,
        currentIndex: 1,
        items: getItems,
        allPokedexEntries: filterAllPokedexEntries,
        selectValue: value.value,
        isLoading: false
      });
    }
  }; */
</script>

<template>
  <div
    class="flex flex-col md:flex-row justify-start md:justify-between items-center pb-10"
  >
    <h1 class="pb-6">PokéList</h1>

    <button>Sort & Filter</button>
  </div>

  <div v-if="isFilterSettingsOpen" class="flex flex-row flex-wrap">
    <form>
      <h2>Filter by:</h2>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Search Pokémon Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Types</span>
        </label>
        <select class="select select-bordered">
          <option disabled selected>Pick one</option>
          <option>Star Wars</option>
          <option>Harry Potter</option>
          <option>Lord of the Rings</option>
          <option>Planet of the Apes</option>
          <option>Star Trek</option>
        </select>
      </div>

      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Regions</span>
        </label>
        <select class="select select-bordered">
          <option disabled selected>Pick one</option>
          <option>Star Wars</option>
          <option>Harry Potter</option>
          <option>Lord of the Rings</option>
          <option>Planet of the Apes</option>
          <option>Star Trek</option>
        </select>
      </div>
    </form>

    <form>
      <h2>Sort by:</h2>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Name</span>
        </label>
        <select class="select select-bordered">
          <option disabled selected>Pick one</option>
          <option>Star Wars</option>
          <option>Harry Potter</option>
          <option>Lord of the Rings</option>
          <option>Planet of the Apes</option>
          <option>Star Trek</option>
        </select>
      </div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Stats</span>
        </label>
        <select class="select select-bordered">
          <option disabled selected>Pick one</option>
          <option>Star Wars</option>
          <option>Harry Potter</option>
          <option>Lord of the Rings</option>
          <option>Planet of the Apes</option>
          <option>Star Trek</option>
        </select>
      </div>
    </form>
    <!-- <Flex pb={6} justify="space-between" flexDir="row" align="center">
                <Heading as="h3" pb={0}>
                  Search Pokémon
                </Heading>
                <CloseButton onClick={onClose} />
              </Flex>
              <Stack spacing={4} w="100%" direction="column">
                <FormControl id="pokemon-name">
                  <FormLabel>Pokémon Name</FormLabel>
                  <Input
                    borderRadius="4px"
                    type="text"
                    bg="white"
                    placeholder="pokémon name"
                    onChange={handleSearchChange}
                    sx={{
                      borderColor: 'hsl(0,0%,80%)',
                      borderRadius: '4px',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      _hover: {
                        borderColor: 'red.200'
                      }
                    }}
                  />
                </FormControl>

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
                    name="typeSearch"
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

                {typeSearch === 'region' && (
                  <FormControl>
                    <FormLabel>Pokédex</FormLabel>
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
                      size="md"
                      name="selectValue"
                      value={{
                        value: selectValue,
                        label: _.startCase(selectValue)
                      }}
                      onChange={handleSelectChange}
                      options={optionsList}
                      isSearchable={false}
                    />
                  </FormControl>
                )}

                {typeSearch === 'type' && (
                  <FormControl>
                    <FormLabel>Types</FormLabel>
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
                      size="md"
                      name="selectValue"
                      value={{
                        value: selectValue,
                        label: _.startCase(selectValue)
                      }}
                      onChange={handleSelectChange}
                      options={optionsList}
                      isSearchable={false}
                    />
                  </FormControl>
                )}
              </Stack> -->
  </div>

  <div
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center justify-center"
  >
    <NuxtLink
      v-for="pokemon in pokemons"
      :to="`/pokemon-list/pokemon-page/${pokemonName}`"
    >
      <PokemonListItem :name="pokemonNameEdited" :number="pokemonNumber" />
    </NuxtLink>
  </div>
</template>
