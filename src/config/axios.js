import axios from "axios";
import store from "store";
import { onLogout } from "actions/currentUserActions";

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Making sure error object always has a response object with status code
    if (!error.response) {
      error.response = { status: 500 };
    }
    if (error.response.status === 401) {
      // Session is no longer valid
      store.dispatch(onLogout(true));
    } else {
      return Promise.reject(error);
    }
  }
);

/**
 * Sets the header with session_id to all axios requests
 * @param {String} session_id
 */
export const setSessionHeader = session_id => {
  axios.defaults.headers.common["session_id"] = session_id;
};

/**
 * Removes the header
 */
export const removeSessionHeader = () => {
  axios.defaults.headers.common["session_id"] = null;
};

export default axiosInstance;
