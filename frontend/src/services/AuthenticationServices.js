import axios from "axios";
import Cookies from 'js-cookie';

export function getUserRole() {
  return axios
    .get("http://localhost:8000/userRole/", {
      // withCredentials: true,
      headers: {
        Authorization: Cookies.get('jwt') //the token is a variable which holds the token
    }
    })
    .then((response) => response.data);
}
