import { defineStore } from "pinia";

export const usePokemonListStore = defineStore({
  id: "pokemon-list-store",
  state: () => {
    return {
      pokemons: [],
      pokemonsDisplayed: [],
      pokemonsPerPage: 24,
      currentPage: 1,
      hasMore: true,
      filters: {
        search: "",
        type: "region",
        region: "national",
      },
      sort: {
        number: "",
        name: "",
        stats: "",
      },
    };
  },
  actions: {
    populatePokemons(arr: []) {
      this.pokemons = arr;
      this.pokemonsDisplayed = arr;
    },
    pushNewDisplayedPokemons() {
      const pageNum = (this.currentPage += 1);
      const indexOfLastResults = pageNum * this.pokemonsPerPage;
      const indexOfFirstResults = indexOfLastResults - this.pokemonsPerPage;
      const newPokemonsBatch = this.pokemons.slice(
        indexOfFirstResults,
        indexOfLastResults
      );

      this.currentPage = pageNum;
      this.pokemonsDisplayed = this.pokemonsDisplayed.concat(newPokemonsBatch);
    },
    filterDisplayedPokemons() {},
    sortDisplayedPokemons() {},
  },
});
