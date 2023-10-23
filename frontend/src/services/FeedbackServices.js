import axios from 'axios';

export function getfeedbacks() {
    return axios.get('http://127.0.0.1:8000/adminDashboard/')
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }else{
        console.log("Status 300"+response.data.message);
        return {status: false, message: response.data.message};
      }
    }).catch(error => {
      console.log(error);
      return {status: false, message: error.message};
    });
};

export function get_feedbacks_by_feedback_type(feedback_type) {
    return axios.get(`http://127.0.0.1:8000/adminDashboard/${feedback_type}/` )
    .then(response => response.data)
};

export function deleteFeedback(feedback_id) {
  return axios.delete(`http://127.0.0.1:8000/adminDashboard/${feedback_id}`)
    .then(response => response.data)
  }