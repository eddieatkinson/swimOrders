import React from 'react';
import MaterialTable from 'material-table';

const JumpStretchCapsItem = (props) => {
  console.log(props);
  const { columns, title, data } = props;
  return (
    <div className='swimmers-table'>
      <MaterialTable
        columns={columns}
        title={title}
        data={data}
        options={{
          search: true,
          pageSize: 10,
          pageSizeOptions: [10, 25, 100],
        }}
      />
    </div>
  );
}

export default JumpStretchCapsItem;
