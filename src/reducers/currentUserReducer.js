import { LOGIN, LOGOUT, CURRENT_USER_LOADING, CURRENT_USER_SUCCESS, CURRENT_USER_ERROR } from "actions/types"

const initialState = {
  isUserLoggedIn: false,
  loading: false, 
  error: null,
  data: {}
};

export default (state = initialState, action) => {

  switch(action.type) {

    case LOGIN: {
      return {
        ...state,
        isUserLoggedIn: true
      }
    }

    case LOGOUT: {
      return {
        ...state,
        isUserLoggedIn: false
      }
    }

    case CURRENT_USER_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case CURRENT_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      }
    }

    case CURRENT_USER_ERROR: {
      return {
        ...state,
        data: {},
        error: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
    
  }

}