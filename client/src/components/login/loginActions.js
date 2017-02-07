import actionType from './loginActionTypes.js';
import axios from 'axios';
function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

export function logInUser(email, password ) {
  return (dispatch) => {
    axios.post("/login", {
      email,
      password
    })
    .then(handleErrors)
    .then(response => dispatch({ type: actionType.LOGIN_SUCCESS , response }))
    .catch(error => dispatch({ type: actionType.LOGIN_FAILURE, error }));
  };
}

export function clearAlert () {
  return (dispatch) => dispatch({ type: actionType.CLEAR_ALERT });
}
