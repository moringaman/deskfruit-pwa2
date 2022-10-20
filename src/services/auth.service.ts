import axios from "axios";

const API_URL = "https://3001-moringaman-deskfruitpwa-qf2szrg586b.ws-eu70.gitpod.io/desks/";

const register = (deskid:string, email:string, password:string) => {
  return axios.post(API_URL + "signup", {
    deskid,
    email,
    password,
  });
};

const login = (deskid:string, password:string) => {
  return axios
    .post(API_URL + "signin", {
      deskid,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;