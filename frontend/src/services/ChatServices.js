import axios from "axios";

// Function to get titles based on user_id.
export async function get_conversation_title(user_id) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/chat/${user_id}/titles/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// Function to get entire conversation between user and bot based on user_id.
export async function get_conversation_by_user_id(user_id) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/chat/${user_id}/return_conversation/`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

// Function to get response of the bot for specific user question.
// const postObject = {"conversation_title": "Sample Conversation","question": "What is the meaning of life?"}
export async function real_time_chat(user_id, postObject) {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/chat/${user_id}/real_time/`,
      postObject
    );
    return response.data;
  } catch (error) {
    console.error(`Error posting data: ${error}`);
  }
}

// Function to submit user feedback regarding Performance and Accuracy for specific user experience.
// const postObject = {"feedback_type": "Accuracy","feedback_details": "What is the meaning of life?"}
// const postObject = {"feedback_type": "Performance","feedback_details": "Beatiful"}

export async function submit_feedback(user_id, postObject) {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/user_feedback/${user_id}/submit_feedback/`,
      postObject
    );
    return response.data;
  } catch (error) {
    console.error(`Error posting data: ${error}`);
  }
}
