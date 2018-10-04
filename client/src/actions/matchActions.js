import axios from "axios";

import {
  ADD_MATCH,
  GET_MATCHES,
  MATCH_LOADING,
  GET_MATCH,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Add Post
export const addMatch = matchData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/match", matchData)
    .then(res =>
      dispatch({
        type: ADD_MATCH,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Matches
export const getMatches = () => dispatch => {
  dispatch(setMatchLoading());
  axios
    .get("/api/match")
    .then(res =>
      dispatch({
        type: GET_MATCHES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MATCHES,
        payload: null
      })
    );
};

// Get Match
export const getMatch = id => dispatch => {
  dispatch(setMatchLoading());
  axios
    .get(`/api/match/${id}`)
    .then(res =>
      dispatch({
        type: GET_MATCH,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MATCH,
        payload: null
      })
    );
};

// Set loading state
export const setMatchLoading = () => {
  return {
    type: MATCH_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
