import {
  ADD_POST,
  GET_POSTS,
  GET_POST,
  UPDATE_POST,
  POST_LOADING,
  DELETE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  current: 1,
  pages: 1,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        current: action.payload.current,
        pages: action.payload.pages,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case ADD_POST:
      state.posts.pop();
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case UPDATE_POST:
      return {
        ...state,
        post: action.payload,
        posts: state.posts.map(post => {
          if (post._id !== action.payload._id) {
            return post;
          } else {
            return action.payload;
          }
        })
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    default:
      return state;
  }
}
