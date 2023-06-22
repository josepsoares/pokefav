class PokemonCardsApiService {
  API_URL = "https://api.pokemontcg.io/v2";

  getCardsRarities = () => {
    return fetch(`${this.API_URL}/rarities`);
  };

  getCards = (
    name: string,
    rarity: string,
    orderBy: string,
    page: number,
    pageSize: number
  ) => {
    const qParam =
      !rarity || rarity === "All"
        ? `name:"${name}"`
        : `name:"${name} (rarity:${rarity})"`;

    return fetch(
      `${this.API_URL}/cards?q=${qParam}&orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`
    );
  };
}

export default new PokemonCardsApiService();
