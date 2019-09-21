import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, forEach, uniqBy, includes, find } from 'lodash';

import GetOrdersAction from '../redux/actions/GetOrdersAction';
import GetAllSwimmersAction from '../redux/actions/GetAllSwimmersAction';
import JumpStretchCapsItem from '../components/JumpStretchCapsItems';

class JumpStretchCaps extends Component {
  componentDidMount() {
    this.props.GetOrdersAction();
    this.props.GetAllSwimmersAction();
  }

  getPracticeGroupList() {
    const practiceGroups = map(uniqBy(this.props.allSwimmers, 'groupName'), (group, i) => {
      let pool;
      switch(group.groupName.substring(0, 2)) {
        case 'CH':
          pool = 'Cherokee';
          break;
        case 'CM':
          pool = 'Cumming';
          break;
        case 'MV':
          pool = 'Mt. View';
          break;
        case 'WS':
          pool = 'Woodstock';
          break;
        default:
          break;
      }
      return {
        id: i + 1,
        pool,
        groupName: group.groupName,
      }
    });
    return practiceGroups;
  }

  getGroupForSwimmer(swimmerId) {
    const swimmerObject = find(this.props.allSwimmers, ['id', swimmerId]);
    const groupForSwimmer = swimmerObject.groupName;
    return groupForSwimmer;
  }

  getQuantities(order, quantityObj) {
    if (this.props.itemId === 19) {
      if (includes(order.special, 'Small')) {
        quantityObj.small += order.qty;
      } else if (includes(order.special, 'Medium')) {
        quantityObj.medium += order.qty;
      } else if (includes(order.special, 'Large')) {
        quantityObj.large += order.qty;
      }
      return {
        small: quantityObj.small,
        medium: quantityObj.medium,
        large: quantityObj.large,
      }
    } else if (this.props.itemId === 20) {
      if (includes(order.color, 'Green')) {
        quantityObj.green += order.qty;
      } else if (includes(order.color, 'Red')) {
        quantityObj.red += order.qty;
      } else if (includes(order.color, 'Blue')) {
        quantityObj.blue += order.qty;
      } else if (includes(order.color, 'Black')) {
        quantityObj.black += order.qty;
      } else if (includes(order.color, 'Gray')) {
        quantityObj.gray += order.qty;
      }
      return {
        green: quantityObj.green,
        red: quantityObj.red,
        blue: quantityObj.blue,
        black: quantityObj.black,
        gray: quantityObj.gray,
      }
    } else if (this.props.itemId === 15) {
      quantityObj.capQty += order.qty;
      return {
        capQty: quantityObj.capQty,
      }
    }
  }

  getQuantityObject() {
    let quantityObj = {};
    if (this.props.itemId === 19) {
      quantityObj = {
        small: 0,
        medium: 0,
        large: 0,
      }
    } else if (this.props.itemId === 20) {
      quantityObj = {
        green: 0,
        red: 0,
        blue: 0,
        black: 0,
        gray: 0,
      }
    } else if (this.props.itemId === 15) {
      quantityObj = {
        capQty: 0,
      }
    }
    return quantityObj;
  }

  getTotalForGroup(group) {
    const quantityObj = this.getQuantityObject();
    forEach(this.props.orders, (order) => {
      if (group.groupName === this.getGroupForSwimmer(order.swimmerId) && order.itemId === this.props.itemId && order.deleted === 0) {
        this.getQuantities(order, quantityObj);
      }
    });
    const totalForGroup = {
      ...quantityObj,
      name: group.pool,
      group: group.groupName,
    }
    return totalForGroup;
  }

  shouldIAdd(dataToAdd) {
    if (this.props.itemId === 19) {
      return dataToAdd.small || dataToAdd.medium || dataToAdd.large;
    } else if (this.props.itemId === 20) {
      return dataToAdd.green || dataToAdd.red || dataToAdd.blue || dataToAdd.black || dataToAdd.gray;
    } else if (this.props.itemId === 15) {
      return dataToAdd.capQty;
    }
  }

  getData() {
    const data = [];
    const practiceGroups = this.getPracticeGroupList();
    forEach(practiceGroups, (group) => {
      const dataToAdd = this.getTotalForGroup(group);
      if (this.shouldIAdd(dataToAdd)) {
        data.push(dataToAdd);
      }
    });
    return data;
  }

  getColumns() {
    let title, columns;
    if (this.props.itemId === 19) {
      title = 'Jump Ropes';
      columns = [
        { title: 'Pool', field: 'name' },
        { title: 'Practice Group', field: 'group' },
        { title: 'Small - Red/White', field: 'small', type: 'numeric' },
        { title: 'Medium - Black/White', field: 'medium', type: 'numeric' }, 
        { title: 'Large - Black/Red', field: 'large', type: 'numeric' },
      ];
    } else if (this.props.itemId === 20) {
      title = 'Stretch Cords'
      columns = [
        { title: 'Pool', field: 'name' },
        { title: 'Practice Group', field: 'group' },
        { title: 'Green', field: 'green', type: 'numeric' },
        { title: 'Red', field: 'red', type: 'numeric' }, 
        { title: 'Blue', field: 'blue', type: 'numeric' },
        { title: 'Black', field: 'black', type: 'numeric' },
        { title: 'Gray', field: 'gray', type: 'numeric' },
      ];
    } else if (this.props.itemId === 15) {
      title = 'Latex Meet Caps';
      columns = [
        { title: 'Pool', field: 'name' },
        { title: 'Practice Group', field: 'group' },
        { title: 'Qty', field: 'capQty', type: 'numeric' },
      ];
    }
    return ([
      columns,
      title,
    ]);
  }

  getTotalForEachSwimmer(swimmer, quantityObj) {
    forEach(this.props.orders, (order) => {
      if (order.swimmerId === swimmer.id && order.itemId === this.props.itemId && !order.deleted) {
        this.getQuantities(order, quantityObj);
      }
    });
    const totalForSwimmer = {
      ...quantityObj,
      name: swimmer.name,
      groupName: swimmer.groupName,
    }
    return totalForSwimmer;
  }

  getOrdersForGroup(groupName) {
    const { allSwimmers, orders } = this.props;
    const data = [];
    forEach(allSwimmers, (swimmer) => {
      const quantityObj = this.getQuantityObject();
      if (find(orders, ['swimmerId', swimmer.id]) && swimmer.groupName === groupName) {
        const dataToAdd = this.getTotalForEachSwimmer(swimmer, quantityObj);
        if (this.shouldIAdd(dataToAdd)) {
          data.push(dataToAdd);
        }
      }
    });
    return data;
  }

  getSwimmerData(data) {
    const swimmerData = [];
    forEach(data, (group) => {
      const dataForGroup = this.getOrdersForGroup(group.group);
      swimmerData.push(dataForGroup);
    });
    return swimmerData;
  }

  render() {
    const columnsAndTitle = this.getColumns();
    const data = this.getData();
    const swimmerData = this.getSwimmerData(data);
    console.log(swimmerData);
    return (
      <div>
        <JumpStretchCapsItem
          columns={columnsAndTitle[0]}
          title={columnsAndTitle[1]}
          data={data}
          swimmerData={swimmerData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSwimmers: state.data.allSwimmers,
    orders: state.data.orders,
  }
}

export default connect(mapStateToProps, {
  GetOrdersAction,
  GetAllSwimmersAction,
})(JumpStretchCaps);
