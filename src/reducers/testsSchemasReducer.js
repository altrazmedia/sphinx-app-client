import * as types from "actions/types";

const initialState = {
  list: {
    data: [],
    error: null,
    loading: false,
  },
  single: {
    data: {},
    error: null,
    loading: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TESTS_SCHEMAS_LOADING: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: action.payload,
        },
      };
    }

    case types.TESTS_SCHEMAS_SUCCESS: {
      return {
        ...state,
        list: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    }

    case types.TESTS_SCHEMAS_ERROR: {
      return {
        ...state,
        list: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    }

    case types.TEST_SCHEMA_LOADING: {
      return {
        ...state,
        single: {
          ...state.single,
          loading: action.payload,
        },
      };
    }

    case types.TEST_SCHEMA_SUCCESS: {
      return {
        ...state,
        single: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    }

    case types.TEST_SCHEMA_ERROR: {
      return {
        ...state,
        single: {
          loading: false,
          error: action.payload,
          data: [],
        },
      };
    }

    default: {
      return state;
    }
  }
};
