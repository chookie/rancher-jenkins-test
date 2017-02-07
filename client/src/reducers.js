import { combineReducers } from 'redux';
import loginReducer from './components/login/loginReducer.js';
import tableReducer from './components/table/TableReducer.js';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  login: loginReducer,
  table: tableReducer,
  routing: routerReducer
});

export default rootReducer;
