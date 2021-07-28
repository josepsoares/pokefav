class PokemonCardsApiService {
  API_URL = 'https://api.pokemontcg.io/v2'

  getCardsRarities = () => {
    return fetch(`${this.API_URL}/rarities`)
  }

  getCardsSubTypes = async () => {
    return fetch(`${this.API_URL}/subtypes`)
  }

  getCards = (name, subtypes, hp, rarity, orderBy, pageSize) => {
    const qParam = ''

    return fetch(
      `${this.API_URL}/cards?q=${qParam}&orderBy=${orderBy}&pageSize=${pageSize}`
    )
  }
}

export default new PokemonCardsApiService()
