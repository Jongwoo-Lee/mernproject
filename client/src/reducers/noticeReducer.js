import {
  ADD_NOTICE,
  GET_NOTICES,
  GET_NOTICE,
  NOTICE_LOADING,
  DELETE_NOTICE
} from "../actions/types";

const initialState = {
  notices: [],
  notice: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NOTICE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_NOTICES:
      return {
        ...state,
        notices: action.payload.notices,
        current: action.payload.current,
        pages: action.payload.pages,
        loading: false
      };
    case GET_NOTICE:
      return {
        ...state,
        notice: action.payload,
        loading: false
      };
    case ADD_NOTICE:
      return {
        ...state,
        notices: [action.payload, ...state.notices]
      };
    case DELETE_NOTICE:
      return {
        ...state,
        notices: state.notices.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
