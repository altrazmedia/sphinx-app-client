import * as types from "actions/types"

const initialState = {
  single: {
    data: {},
    error: null,
    loading: false
  },
  list: {
    data: [],
    error: null,
    loading: false
  }
};

export default (state = initialState, action) => {

  switch(action.type) {

    case types.COURSES_LIST_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: action.payload
        }
      }
    }

    case types.COURSES_LIST_SUCCESS: {
      return {
        ...state,
        list: {
          loading: false,
          error: null,
          data: action.payload
        }
      }
    }

    case types.COURSES_LIST_ERROR: {
      return {
        ...state,
        list: {
          loading: false,
          error: action.payload,
          data: []
        }
      }
    }

    case types.COURSE_LOADING: {
      return {
        ...state,
        single: {
          ...state.single,
          loading: action.payload
        }
      }
    }

    case types.COURSE_SUCCESS: {
      return {
        ...state,
        single: {
          loading: false,
          error: null,
          data: action.payload
        }
      }
    }

    case types.COURSE_ERROR: {
      return {
        ...state,
        single: {
          loading: false,
          error: action.payload,
          data: {}
        }
      }
    }

    default: {
      return state;
    }
    
  }

}