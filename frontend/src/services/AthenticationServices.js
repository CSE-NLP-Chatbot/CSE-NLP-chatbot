import axios from 'axios';

// export function getStudents() {
//   return axios.get('http://127.0.0.1:8000/students/')
//     .then(response => response.data)
// }

// export function deleteStudent(studentId) {
//   return axios.delete('http://127.0.0.1:8000/students/' + studentId + '/', {
//    method: 'DELETE',
//    headers: {
//      'Accept':'application/json',
//      'Content-Type':'application/json'
//    }
//   })
//   .then(response => response.data)
// }

export function addUser(user){
    console.log(user)
    axios.post('http://127.0.0.1:8000/signup/',user)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
//   return axios.post('http://127.0.0.1:8000/', {
//     first_name:user.firstname.value,
//     last_name:user.lastname.value,
//     email:user.email.value,
//     password1:user.password.value,
//     password2:user.confirmPassword.value,
//     user_type:user.role
//   })
//     .then(response=>response.data)
}

// export function updateStudent(stuid, student) {
//   return axios.put('http://127.0.0.1:8000/students/' + stuid + '/', {
//     FirstName:student.FirstName.value,
//     LastName:student.LastName.value,
//     RegistrationNo:student.RegistrationNo.value,
//     Email:student.Email.value,
//     Course:student.Course.value
//   })
//    .then(response => response.data)
// }

