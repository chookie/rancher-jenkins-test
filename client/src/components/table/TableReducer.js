import actionType from './tableActionTypes.js';

const initialState = {};

function tableReducer (state = initialState, action) {
  switch (action.type) {
    case actionType.TABLE_SUCCESS:
      return Object.assign({data: action.table}, state, {showErrorMessage: false});
    case actionType.TABLE_FAILURE:
      return Object.assign({data: action.table}, state, {showErrorMessage: true});
    default:
      return state;
  }
}

export default tableReducer;
