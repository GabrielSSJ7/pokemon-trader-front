import axios from 'axios';

function HttpClient() {
    return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
	Authorization: localStorage.getItem('bxpokemon:userToken'),
    }
  });
}

export default HttpClient;
