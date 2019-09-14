import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import MaterialTable from 'material-table';
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
      return ({
        name: swimmer.name,
        pool: poolName,
        total: this.getOrderTotal(swimmer.id),
      });
    });
    return tableContents;
  }

  render() {
    return (
      <div className='swimmers-table'>
        <MaterialTable
          columns={[
            { title: 'Name', field: 'name' },
            { title: 'Pool', field: 'pool' },
            { title: 'Order total', field: 'total', type:'currency' },
          ]}
          title='Swimmer Order Totals'
          data={this.getTableContents()}
          options={{
            search: true,
            pageSize: 10,
            pageSizeOptions: [10, 25, 100],
          }}
        />
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
