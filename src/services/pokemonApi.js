class PokemonApiService {
  API_URL = 'https://pokeapi.co/api/v2';

  getInfoPokemonPageReq = async pokemon => {
    console.log(pokemon);
    const urls = [
      `${this.API_URL}/pokemon/${pokemon}`,
      `${this.API_URL}/pokemon-species/${pokemon}`
    ];

    const pokemonData = await Promise.all(
      urls.map(async url => {
        try {
          const getRequest = await fetch(url);
          const getDataRequest = await getRequest.json();
          return getDataRequest;
        } catch (err) {
          return err.response.message;
        }
      })
    );

    console.log(pokemonData);

    let pokemonAlternateForms = null;
    const arrayAlternateForms = [];
    for (let item of pokemonData[1].varieties) {
      if (!item.is_default) {
        arrayAlternateForms.push(item.pokemon.url);
      }
    }

    if (arrayAlternateForms.length !== 0) {
      pokemonAlternateForms = await Promise.all(
        arrayAlternateForms.map(async url => {
          try {
            const getRequest = await fetch(url);
            const getDataRequest = await getRequest.json();
            return getDataRequest;
          } catch (err) {
            return err.response.message;
          }
        })
      );
    }

    console.log(pokemonAlternateForms);

    const pokemonEvChain = await fetch(pokemonData[1].evolution_chain.url);
    const pokemonEvChainData = await pokemonEvChain.json();

    return { pokemonData, pokemonEvChainData, pokemonAlternateForms };
  };

  getDataPokeListPageReq = async () => {
    const urls = [
      `${this.API_URL}/pokedex/`,
      `${this.API_URL}/type/`,
      `${this.API_URL}/pokedex/national`
    ];

    return Promise.all(
      urls.map(async url => {
        const requestData = await fetch(url);
        return await requestData.json();
      })
    );
  };

  getRegionsAndGamesReq = async () => {
    const urls = [`${this.API_URL}/version-group/`, `${this.API_URL}/region/`];

    return Promise.all(
      urls.map(async url => {
        try {
          const getRequest = await fetch(url);
          const getDataRequest = await getRequest.json();
          return getDataRequest.results;
        } catch (err) {
          return err.response.message;
        }
      })
    );
  };

  getPokedex = async pokedex => {
    return fetch(`${this.API_URL}/pokedex/${pokedex}`);
  };
}

export default new PokemonApiService();
