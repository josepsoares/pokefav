class PokemonCardsApiService {
  API_URL = 'https://api.pokemontcg.io/v2';

  getCardsRarities = () => {
    return fetch(`${this.API_URL}/rarities`);
  };

  getCards = (name, rarity, orderBy, page, pageSize) => {
    const qParam =
      !rarity || rarity === 'All'
        ? `name:"${name}"`
        : `name:"${name} (rarity:${rarity})"`;

    console.log(qParam);

    return fetch(
      `${this.API_URL}/cards?q=${qParam}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
    );
  };
}

export default new PokemonCardsApiService();
