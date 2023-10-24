import axios from "axios";
import Cookies from 'js-cookie';
export function getUser() {
  return axios
    .get(`${process.env.REACT_APP_BACKEND}/user_ID`, {
      headers: {
        Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
      },
    })
}


// Function to get titles based on user_id.
export async function get_conversation_title(user_ID) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/chat/${user_ID}/titles/`
      // `http://127.0.0.1:8000/chat/${user_ID}/titles/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// Function to get entire conversation between user and bot based on user_ID.
export async function get_conversation_by_user_id(user_ID) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/chat/${user_ID}/return_conversation/`,{
        headers: {
          Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
        },
      });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// Function to get response of the bot for specific user question.
// const postObject = {"conversation_title": "Sample Conversation","question": "What is the meaning of life?"}
export async function real_time_chat(user_ID, postObject) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/chat/${user_ID}/real_time/`,
      postObject,
      {
        headers: {
          Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error posting data: ${error}`);
  }
}

// Function to submit user feedback regarding Performance and Accuracy for specific user experience.
// const postObject = {"feedback_type": "Accuracy","feedback_details": "What is the meaning of life?"}
// const postObject = {"feedback_type": "Performance","feedback_details": "Beatiful"}

export async function submit_feedback(user_ID, postObject) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user_feedback/${user_ID}/submit_feedback/`,
      postObject,
      {
        headers: {
          Authorization: Cookies.get("jwt"), //the token is a variable which holds the token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error posting data: ${error}`);
  }
}
