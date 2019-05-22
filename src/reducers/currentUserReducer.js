import * as types from "actions/types"

const initialState = {
  isUserLoggedIn: false,
  loading: false, 
  error: null,
  data: {}
};

export default (state = initialState, action) => {

  switch(action.type) {

    case types.LOGIN: {
      return {
        ...state,
        isUserLoggedIn: true
      }
    }

    case types.LOGOUT: {
      return {
        ...state,
        isUserLoggedIn: false,
        data: {}
      }
    }

    case types.CURRENT_USER_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case types.CURRENT_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        error: null,
        loading: false
      }
    }

    case types.CURRENT_USER_ERROR: {
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