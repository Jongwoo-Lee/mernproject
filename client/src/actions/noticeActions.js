import axios from "axios";

import {
  ADD_NOTICE,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_NOTICES,
  GET_NOTICE,
  NOTICE_LOADING,
  DELETE_NOTICE
} from "./types";

// Add Post
export const addNotice = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/notice", postData)
    .then(res =>
      dispatch({
        type: ADD_NOTICE,
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

// Get Post
export const getNotices = () => dispatch => {
  dispatch(setNoticeLoading());
  axios
    .get("/api/notice")
    .then(res =>
      dispatch({
        type: GET_NOTICES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NOTICES,
        payload: null
      })
    );
};

// Get Post
export const getNotice = id => dispatch => {
  dispatch(setNoticeLoading());
  axios
    .get(`/api/notice/${id}`)
    .then(res =>
      dispatch({
        type: GET_NOTICE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_NOTICE,
        payload: null
      })
    );
};

// Delete Post
export const deleteNotice = id => dispatch => {
  axios
    .delete(`/api/notice/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_NOTICE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/notice/like/${id}`)
    .then(res => dispatch(getNotices()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Rmove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/notice/unlike/${id}`)
    .then(res => dispatch(getNotices()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addComment = (postID, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/notice/comment/${postID}`, commentData)
    .then(res =>
      dispatch({
        type: GET_NOTICE,
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

// Delete Comment
export const deleteComment = (postID, commentID) => dispatch => {
  axios
    .delete(`/api/notice/comment/${postID}/${commentID}`)
    .then(res =>
      dispatch({
        type: GET_NOTICE,
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

// Set loading state
export const setNoticeLoading = () => {
  return {
    type: NOTICE_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
