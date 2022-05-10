import HttpClient from "./http_client";

function Authentication() {
  const httpClient = HttpClient();
  const isUserAuthenticated = () => {
    const token = getUserToken();
    if (token) {
      return true;
    }

    return false;
  };

  const getUserToken = () => {
    return localStorage.getItem("bxpokemon:userToken");
  };

  const getUserData = () => {
    return {
      token: getUserToken(),
      username: localStorage.getItem("bxpokemon:username"),
    }
  }

  const setUserToken = (data) => {
    localStorage.setItem("bxpokemon:userToken", data.token);
    localStorage.setItem("bxpokemon:username", data.username);
  }

  const logout = () => {
    localStorage.removeItem("bxpokemon:userToken");
    localStorage.removeItem("bxpokemon:username");
  }

  const login = async (username, password) => {
    const response = await httpClient.post("/auth/login", {
      username,
      password
    });
    setUserToken(response.data);
  };

  const register = async (username, password, name) => {
    const response = await httpClient.post("/users", {
      username,
      password,
      name
    });
    return response
  }

  return {
    isUserAuthenticated,
    getUserToken,
    getUserData,
    login,
    logout,
    register
  }
}

export default Authentication;
