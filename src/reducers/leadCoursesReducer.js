import * as types from "actions/types"

const initialState = {
  data: [],
  error: null,
  loading: false
};

export default (state = initialState, action) => {

  switch(action.type) {

    case types.LEAD_COURSES_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case types.LEAD_COURSES_SUCCESS: {
      return {
        loading: false,
        error: null,
        data: action.payload
      }
    }

    case types.LEAD_COURSES_ERROR: {
      return {
        loading: false,
        error: action.payload,
        data: []
      }
    }

    default: {
      return state;
    }
    
  }

}