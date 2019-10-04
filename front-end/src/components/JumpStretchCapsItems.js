import React from 'react';
import MaterialTable from 'material-table';
import { map } from 'lodash';

const JumpStretchCapsItem = (props) => {
  const { columns, title, data, swimmerData } = props;
  let propertyArray = [];
  switch(title) {
    case "Jump Ropes":
      propertyArray = [
        'name',
        'small',
        'medium',
        'large',
      ];
      break;
    case "Stretch Cords":
      propertyArray = [
        'name',
        'green',
        'red',
        'blue',
        'black',
        'gray',
      ];
      break;
    case "Latex Meet Caps":
      propertyArray = [
        'name',
        'capQty',
      ];
      break;
  }
  const getDetailPanelContents = (detailArray) => {
    const detailPanelContents = map(detailArray, (swimmer, i) => {
      return (
        <div key={i}>
          {map(propertyArray, (property, i) => {
            return(
              <div key={i}>{swimmer[property]}</div>
            )
          })}
        </div>
      );
    });
    return detailPanelContents;
  }
  return (
    <div className='swimmers-table'>
      <MaterialTable
        columns={columns}
        title={title}
        data={data}
        options={{
          search: true,
        }}
        // detailPanel={rowData => {
        //   return (
        //     <div style={{height: '100px'}}>
        //       {getDetailPanelContents(swimmerData[rowData.tableData.id])}
        //     </div>
        //   )
        // }}
        // onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </div>
  );
}

export default JumpStretchCapsItem;
