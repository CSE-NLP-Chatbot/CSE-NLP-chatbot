import axios from 'axios';

export function getfeedbacks() {
    return axios.get('http://127.0.0.1:8000/adminDashboard/')
    .then(response => response.data)
};

export function get_feedbacks_by_feedback_type(feedback_type) {
    return axios.get(`http://127.0.0.1:8000/adminDashboard/${feedback_type}/` )
    .then(response => response.data)
};

export function deleteFeedback(feedback_id) {
    return axios.delete(`http://127.0.0.1:8000/adminDashboard/${feedback_id}`)
    .then(response => response.data)
  }