import React, {PropTypes} from 'react';
// import {Link} from 'react-router';

const TableListRow = ({api}) => {
  return (
    <tr>
      <td>{api.id}</td>
      <td>{api.name}</td>
      <td>{api.description}</td>
      <td>{api.type}</td>
      <td>{api.imageUrl}</td>
      <td>{api.documentionUrl}</td>
      <td>{api.healthUrl}</td>
    </tr>
  );
};

TableListRow.propTypes = {
  api: PropTypes.object.isRequired
};

export default TableListRow;
