import axios from "axios";

const baseURL = "http://localhost:3001/api/"

const axiosInstance = axios.create({
  baseURL
});

axiosInstance.interceptors.response.use(
  response => { return response },
  error => {
    // Making sure error object always has a response object with status code
    if (!error.response) { 
      error.response = { status: 500 };
    }
    return Promise.reject(error)
  }
)

/**
 * Sets the header with session_id to all axios requests
 * @param {String} session_id 
 */
export const setSessionHeader = (session_id) => {
  axios.defaults.headers.common["session_id"] = session_id;
}

/**
 * Removes the header
 */
export const removeSessionHeader = () => {
  axios.defaults.headers.common["session_id"] = null;
}



export default axiosInstance;