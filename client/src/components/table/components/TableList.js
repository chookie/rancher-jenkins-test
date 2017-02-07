import React, {PropTypes} from 'react';
import TableListRow from './TableListRow';

const TableList = ({apis}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Type</th>
        <th>Image</th>
        <th>Documentation</th>
        <th>Health</th>
      </tr>
      </thead>
      <tbody>
      {apis.map(api =>
        <TableListRow key={api.id} api={api}/>
      )}
      </tbody>
    </table>
  );
};

TableList.propTypes = {
  apis: PropTypes.array.isRequired
};

export default TableList;