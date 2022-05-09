import HttpClient from "./http_client";

function Authentication() {
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

  const setUserToken = (token) => {
    localStorage.setItem("bxpokemon:userToken", token);
  }

  const login = async (username, password) => {
    const response = await HttpClient.post("/auth/login", {
      username,
      password
    });
    setUserToken(response.data.token);
  };

  const register = async (username, password, name) => {
    const response = await HttpClient.post("/users", {
      username,
      password,
      name
    });
    return response
  }

  return {
    isUserAuthenticated,
    getUserToken,
    login,
    register
  }
}

export default Authentication();
