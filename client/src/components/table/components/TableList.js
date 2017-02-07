import React, {PropTypes} from 'react';
import TableListRow from './TableListRow';

const TableList = ({portfolios}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>Client</th>
        <th>City</th>
        <th>Country</th>
        <th>Stock</th>
        <th>Quantity</th>
        <th>Value</th>
        <th>Buy Data</th>
        <th>Expire Date</th>
        <th>Notes</th>
        <th>Contact</th>
      </tr>
      </thead>
      <tbody>
      {portfolios.map(portfolio =>
        <TableListRow key={portfolio.id} portfolio={portfolio}/>
      )}
      </tbody>
    </table>
  );
};

TableList.propTypes = {
  portfolios: PropTypes.array.isRequired
};

export default TableList;