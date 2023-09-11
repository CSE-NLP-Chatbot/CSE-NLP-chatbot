import axios from 'axios';

export function updateKnowledgebase(upt) {
    return axios.post('http://127.0.0.1:8000/adminDashboard/update',{
        update_information:upt.update_information.value,
    })
    .then(response => response.data)
};

export function getKnowledgebaseInfo() {
    return axios.get('http://127.0.0.1:8000/adminDashboard/knowledgebase')
    .then(response => response.data)
};

export function deleteKnowledgebaseInfo(update_id) {
    return axios.delete(`http://127.0.0.1:8000/adminDashboard/knowledgebase/${update_id}`)
    .then(response => response.data)
  }

