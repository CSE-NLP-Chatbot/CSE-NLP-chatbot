import axios from "axios";
import Cookies from 'js-cookie';

export function getfeedbacks() {
  return axios
    .get("http://localhost:8000/adminDashboard/", {
      headers: {
        Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      return { status: false, message: error.message };
    });
}

export function get_userId() {
  return axios
    .get(`http://localhost:8000/token/`, {
      headers: {
        Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
      },
    })
    .then((response) => response.data);
}

export function get_feedbacks_by_feedback_type(feedback_type) {
  return axios
    .get(`http://localhost:8000/adminDashboard/${feedback_type}/`, {
      headers: {
        Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
      },
    })
    .then((response) => response.data);
}

export function deleteFeedback(feedback_id) {
  return axios
    .delete(`http://localhost:8000/adminDashboard/${feedback_id}`, {
      headers: {
        Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
      },
    })
    .then((response) => response.data);
}
