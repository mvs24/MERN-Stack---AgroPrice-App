import axios from "axios";

import { USER_ERROR, SIGN_IN_USER, USER_ERROR_LOGIN, GET_USER_DATA, GET_USER_DATA_ERROR } from "./types";

export const signUpUser = (userData, history) => dispatch => {
  axios
    .post("/api/user/register", userData)
    .then(res => history.push('/signIn'))
    .catch(err =>
      dispatch({
        type: USER_ERROR,
        payload: err.response.data
      })
    );
};

export const signInUser = (userData, history) => dispatch => {
    axios.post('/api/user/login', userData).then(res => {
      dispatch({
        type: SIGN_IN_USER,
        payload: res.data
      })
      history.push('/home');
    }).catch(err => dispatch({
      type: USER_ERROR_LOGIN,
      payload: err.response.data
    })
    )
}

export const getUserData = () => dispatch => {
  axios.get('/api/user/current')
    .then(res => dispatch({ type: GET_USER_DATA, payload: res.data }))  
    .catch(err => dispatch({ type: GET_USER_DATA_ERROR, payload: err.response.data }))
}
