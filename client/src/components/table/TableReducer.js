import actionType from './tableActionTypes.js';

const initialState = {data: [] };

function isEmpty(object) {
  return Object.keys(object).length === 0;
}

function tableReducer(state = initialState, action) {
  if (isEmpty(state)) {
    // Now we are using isomorphic empty object is coming through rather than undefined
    // so not geting default.
    state = initialState;
  }
  switch (action.type) {
    case actionType.TABLE_SUCCESS:
      return { data: action.table.data.apis, showErrorMessage: false };
    case actionType.TABLE_FAILURE:
      return Object.assign({ data: action.table.data.apis }, state, { showErrorMessage: true });
    default:
      return state;
  }
}

export default tableReducer;
