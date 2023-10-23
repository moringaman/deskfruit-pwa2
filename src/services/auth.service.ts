import axios from "axios";
import env from "react-dotenv";
import { API_BASE_URL } from '../config'

const API_URL = `${API_BASE_URL}/desks/`;
console.log('API URL ', API_URL, env, process.env)

const register = (deskId:string, email:string, password:string) => {
  return axios.post(API_URL + "/signup", {
    deskId,
    email,
    password,
  }
  );
};

const login = (deskId:string, password:string) => {
  return axios
    .post(API_URL + "/signin", {
      deskId,
      password,
    }
  )
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