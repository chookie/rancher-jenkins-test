'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import NotFoundPage from './components/notFound/NotFoundPage';
import DashBoardPage from './components/dashboard/DashBoardPage';
import PrintPage from './components/print/PrintPage';
import SavePage from './components/save/SavePage';
import TablePage from './components/table/TableContainer';
const requireAccess = () => {

};

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/dashboard" component={DashBoardPage} onEnter={requireAccess} />
        <Route path="print" component={PrintPage} />
        <Route path="save" component={SavePage} />
        <Route path="table" component={TablePage} />
        <Route path="*" component={NotFoundPage} />
    </Route>
);
