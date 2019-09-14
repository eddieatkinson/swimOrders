import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import MaterialTable from 'material-table';
import { map, forEach, uniqBy, includes, find } from 'lodash';

import GetOrdersAction from '../redux/actions/GetOrdersAction';
import GetAllSwimmersAction from '../redux/actions/GetAllSwimmersAction';
import GetPoolsAction from '../redux/actions/GetPoolsAction';
import GetItemsAction from '../redux/actions/GetItemsAction';
import { formatter } from '../utilities';
import JumpStretchCapsItem from '../components/JumpStretchCapsItems';

class JumpStretchCaps extends Component {
  componentDidMount() {
    this.props.GetOrdersAction();
    this.props.GetAllSwimmersAction();
    // this.props.GetPoolsAction();
    // this.props.GetItemsAction();
  }

  // getItemPrice(itemId, sizeId, qty) {
  //   let itemPrice = 0;
  //   forEach(this.props.items, (item) => {
  //     if(item.id === itemId) {
  //       if(item.price === item.adultPrice || item.onlyAdult || sizeId < 4 || sizeId === 10) {
  //         itemPrice = qty * item.price;
  //       } else {
  //         itemPrice = qty * item.adultPrice;
  //       }
  //     }
  //   });
  //   return itemPrice;
  // }

  // getOrderTotal(swimmerId) {
  //   let orderTotal = 0;
  //   forEach(this.props.orders, (order) => {
  //     if(order.swimmerId === swimmerId) {
  //       orderTotal += this.getItemPrice(order.itemId, order.sizeId, order.qty);
  //     }
  //   });
  //   return orderTotal;
  // }

  // getTableContents() {
  //   const tableContents = map(this.props.allSwimmers, (swimmer, i) => {
  //     let poolName;
  //     forEach(this.props.pools, (pool) => {
  //       if(swimmer.poolId === pool.id) {
  //         poolName = pool.name;
  //       }
  //     });
  //     return ({
  //       name: swimmer.name,
  //       pool: poolName,
  //       total: this.getOrderTotal(swimmer.id),
  //     });
  //   });
  //   return tableContents;
  // }

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

  getTotalForGroup(group) {
    let smallTotal = 0;
    let mediumTotal = 0;
    let largeTotal = 0;
    forEach(this.props.orders, (order) => {
      if (group.groupName === this.getGroupForSwimmer(order.swimmerId) && order.itemId === 19 && order.deleted === 0) {
        if (includes(order.special, 'Small')) {
          smallTotal += order.qty;
        } else if (includes(order.special, 'Medium')) {
          mediumTotal += order.qty;
        } else if (includes(order.special, 'Large')) {
          largeTotal += order.qty;
        }
      }
    });
    const totalForGroup = {
      name: group.pool,
      group: group.groupName,
      small: smallTotal,
      medium: mediumTotal,
      large: largeTotal,
    }
    return totalForGroup;
  }

  getJumpRopeData() {
    const data = [];
    const practiceGroups = this.getPracticeGroupList();
    forEach(practiceGroups, (group) => {
      const jumpRopeData = this.getTotalForGroup(group);
      data.push(jumpRopeData);
    });
    return data;
  }

  render() {
    return (
      <div>
        <JumpStretchCapsItem
          columns={[
            { title: 'Pool', field: 'name' },
            { title: 'Practice Group', field: 'group' },
            { title: 'Small - Red/White', field: 'small', type: 'numeric' },
            { title: 'Medium - Black/White', field: 'medium', type: 'numeric' }, 
            { title: 'Large - Black/Red', field: 'large', type: 'numeric' }
          ]}
          title='Jump Ropes'
          data={this.getJumpRopeData()}
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
  // GetPoolsAction,
  // GetItemsAction,
})(JumpStretchCaps);
