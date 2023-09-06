import axios from 'axios';

export function getStudents() {
    return axios.get('http://127.0.0.1:8000/students/')
    .then(response => response.data)
};