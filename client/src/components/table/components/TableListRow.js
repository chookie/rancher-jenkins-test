import React, {PropTypes} from 'react';
// import {Link} from 'react-router';

const TableListRow = ({portfolio}) => {
  return (
    <tr>
      <td>{portfolio.client}</td>
      <td>{portfolio.city}</td>
      <td>{portfolio.country}</td>
      <td>{portfolio.stock}</td>
      <td>{portfolio.quantity100/100}</td>
      <td>{portfolio.value100/100}</td>
      <td>{portfolio.buyDate}</td>
      <td>{portfolio.expireDate}</td>
      <td>{portfolio.notes}</td>
      <td>{portfolio.contact}</td>
    </tr>
  );
};

TableListRow.propTypes = {
  portfolio: PropTypes.object.isRequired
};

export default TableListRow;
