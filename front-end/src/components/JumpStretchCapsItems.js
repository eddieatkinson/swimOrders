import React from 'react';
import MaterialTable from 'material-table';

const JumpStretchCapsItem = (props) => {
  const { columns, title, data } = props;
  return (
    <div className='swimmers-table'>
      <MaterialTable
        columns={columns}
        title={title}
        data={data}
        options={{
          search: true,
          // pageSize: 10,
          // pageSizeOptions: [10, 25, 50],
        }}
        // actions={[
        //   {
        //     icon: 'save',
        //     tooltip: 'Save User',
        //   }
        // ]}
        // onRowClick={(e) => console.log(e.currentTarget.children[2].innerHTML)}
        // onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
}

export default JumpStretchCapsItem;
