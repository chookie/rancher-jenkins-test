import actionType from './loginActionTypes.js';

const initialState = {};

function loginReducer (state = initialState, action) {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return state;
    case actionType.LOGIN_FAILURE:
      return Object.assign({}, state, {showErrorMessage: true});
    case actionType.CLEAR_ALERT:
      return Object.assign({}, state, {showErrorMessage: false});
    default:
      return state;
  }
}

export default loginReducer;
