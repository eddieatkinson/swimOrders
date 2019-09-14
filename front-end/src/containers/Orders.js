import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { map, forEach } from 'lodash';

import GetOrdersAction from '../redux/actions/GetOrdersAction';
import GetSwimmersAction from '../redux/actions/GetSwimmersAction';
import GetPoolsAction from '../redux/actions/GetPoolsAction';
import GetItemsAction from '../redux/actions/GetItemsAction';
import { formatter } from '../utilities';

class Orders extends Component {
  componentDidMount() {
    this.props.GetOrdersAction();
    this.props.GetSwimmersAction();
    this.props.GetPoolsAction();
    this.props.GetItemsAction();
  }

  getItemPrice(itemId, sizeId, qty) {
    let itemPrice = 0;
    forEach(this.props.items, (item) => {
      if(item.id === itemId) {
        if(item.price === item.adultPrice || item.onlyAdult || sizeId < 4 || sizeId === 10) {
          itemPrice = qty * item.price;
        } else {
          itemPrice = qty * item.adultPrice;
        }
      }
    });
    return itemPrice;
  }

  getOrderTotal(swimmerId) {
    let orderTotal = 0;
    forEach(this.props.orders, (order) => {
      if(order.swimmerId === swimmerId) {
        orderTotal += this.getItemPrice(order.itemId, order.sizeId, order.qty);
      }
    });
    return orderTotal;
  }

  getTableContents() {
    const tableContents = map(this.props.allSwimmers, (swimmer, i) => {
      let poolName;
      forEach(this.props.pools, (pool) => {
        if(swimmer.poolId === pool.id) {
          poolName = pool.name;
        }
      });
      return (
        <tr key={i}>
          <td>{i+1}</td>
          <td>{swimmer.name}</td>
          <td>{poolName}</td>
          <td>{formatter.format(this.getOrderTotal(swimmer.id))}</td>
        </tr>
      )
    });
    return tableContents;
  }

  render() {
    return (
      <div className='swimmers-table'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Pool</th>
              <th>Order Total</th>
            </tr>
          </thead>
          <tbody>
            {this.getTableContents()}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSwimmers: state.data.allSwimmers,
    orders: state.data.orders,
    pools: state.data.pools,
    items: state.data.items,
  }
}

export default connect(mapStateToProps, {
  GetOrdersAction,
  GetSwimmersAction,
  GetPoolsAction,
  GetItemsAction,
})(Orders);
