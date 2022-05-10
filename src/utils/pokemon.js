import HttpClient from "../lib/http_client";
function Pokemon() {
  const httpClient = HttpClient();
  const listAll = async (limit=10, offset=0) => {
    const pokemons = await httpClient.get(`/pokemons?limit=${limit}&offset=${offset}`);
    return pokemons;
  }

  const listUserPokemons = async () => {
    const pokemons = await httpClient.get(`/users/pokemons`);
    return pokemons;
  }

  const buy = async (id) => {
    const pokemon = await httpClient.post(`/pokemons/operate/${id}`);
    return pokemon;
  }

  const openToSell = async (id, type) => {
    const pokemon = await httpClient.put(`/pokemons/toggle/${id}/${type}`);
    return pokemon;
  }

  return {
    listAll,
    listUserPokemons,
    openToSell,
    buy
  }
}

export default Pokemon();
