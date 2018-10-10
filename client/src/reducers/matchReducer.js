import {
  ADD_MATCH,
  GET_MATCHES,
  GET_MATCH,
  MATCH_LOADING
} from "../actions/types";

const initialState = {
  matches: [],
  match: {},
  current: 1,
  pages: 1,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MATCH_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_MATCH:
      return {
        ...state,
        matches: [action.payload, ...state.matches]
      };
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload.matches,
        current: action.payload.current,
        pages: action.payload.pages,
        loading: false
      };
    case GET_MATCH:
      return {
        ...state,
        match: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
