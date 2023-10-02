import axios from 'axios';

export function getUserRole() {
    return axios.get('http://127.0.0.1:8000/userRole/', {
        withCredentials: true,
      })
    .then(response => response.data)
};
