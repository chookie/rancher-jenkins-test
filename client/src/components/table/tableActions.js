import actionType from './tableActionTypes.js';
import axios from 'axios';

function handleErrors(response) {
  if (response.status >= 200 && status < 300) {
    return response;
  }
  throw Error(response.statusText);
}

export function loadData() {
  return (dispatch) => {
    // const table = [{id: 0,stock: "Stock 1"},{id: 1,stock: "Stock 2"}];
    // dispatch({ type: actionType.TABLE_SUCCESS , table });
    axios.get("http://localhost:3004/portfolios")
    .then(handleErrors)
    .then(response => {
      dispatch({ type: actionType.TABLE_SUCCESS , table: response.data });
    })
    .catch(error => {
      dispatch({ type: actionType.TABLE_FAILURE, error });
    });
  };
}
