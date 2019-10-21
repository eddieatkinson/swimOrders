import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { isEmpty, forEach, find, sortBy } from 'lodash';

import GetOrdersAction from '../redux/actions/GetOrdersAction';
import GetAllSwimmersAction from '../redux/actions/GetAllSwimmersAction';
import GetPoolsAction from '../redux/actions/GetPoolsAction';
import GetItemsAction from '../redux/actions/GetItemsAction';
import GetSizesAction from '../redux/actions/GetSizesAction';
import OrdersPDF from '../components/OrdersPDF';

class Orders extends Component {
  componentDidMount() {
    this.props.GetOrdersAction();
    this.props.GetAllSwimmersAction();
    this.props.GetPoolsAction();
    this.props.GetItemsAction();
    this.props.GetSizesAction();
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
      if(order.deleted === 0 && order.swimmerId === swimmerId && swimmerId !== 1) { // not Ella
        orderTotal += this.getItemPrice(order.itemId, order.sizeId, order.qty);
      }
    });
    return orderTotal;
  }

  getItemName(itemId) {
    const itemName = find(this.props.items, ['id', itemId]).item;
    return itemName;
  }

  getSizeName(sizeId) {
    const sizeName = find(this.props.sizes, ['id', sizeId]).name;
    return sizeName;
  }

  getOrderDetails(swimmerId) {
    const orderDetails = [];
    forEach(this.props.orders, (order) => {
      if(order.swimmerId === swimmerId) {
        let itemsObject = {
          itemName: this.getItemName(order.itemId),
          qty: order.qty,
        }
        if(order.itemId === 19 || order.itemId === 20) {
          itemsObject = {
            ...itemsObject,
            color: order.special || order.color,
          }
        } else if (order.sizeId) {
          itemsObject = {
            ...itemsObject,
            size: this.getSizeName(order.sizeId),
          }
        }
        orderDetails.push(itemsObject);
      }
    });
    return orderDetails;
  }

  getTableContents(isForThePDF) {
    const tableContents = []
    forEach(this.props.allSwimmers, (swimmer, i) => {
      let poolName;
      forEach(this.props.pools, (pool) => {
        if(swimmer.poolId === pool.id) {
          poolName = pool.name;
        }
      });
      const total = this.getOrderTotal(swimmer.id);
      if (total || swimmer.id === 1) {
        if (isForThePDF) {
          tableContents.push({
            swimmerId: swimmer.id,
            first: swimmer.firstName,
            last: swimmer.lastName,
            pool: poolName,
            poolId: swimmer.poolId,
            total,
            orderDetails: this.getOrderDetails(swimmer.id),
          });
        } else {
          tableContents.push({
            first: swimmer.firstName,
            last: swimmer.lastName,
            pool: poolName,
            total,
          });
        }
      }
      // return ({
      //   first: swimmer.firstName,
      //   last: swimmer.lastName,
      //   pool: poolName,
      //   total: this.getOrderTotal(swimmer.id),
      // });
    });
    const sortedTableContents = sortBy(tableContents, ['last']);
    return sortedTableContents;
  }

  getPDFs() {
    const pdfs = [];
    const orders = this.getTableContents(true);
    forEach(this.props.pools, (pool, i) => {
      if (!isEmpty(orders) && pool && find(orders, ['poolId', pool.id])) {
        pdfs.push(
          <OrdersPDF key={i} title={pool.name} poolId={pool.id} orders={orders} />
        )
      }
    });
    return pdfs;
  }

  render() {
    return (
      <div className='swimmers-table'>
        <MaterialTable
          columns={[
            { title: 'First Name', field: 'first' },
            { title: 'Last Name', field: 'last' },
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
        <div style={{marginTop: 10}}>
          {
            !isEmpty(this.props.pools) && this.getPDFs()
          }
        </div>
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
    sizes: state.data.sizes,
  }
}

export default connect(mapStateToProps, {
  GetOrdersAction,
  GetAllSwimmersAction,
  GetPoolsAction,
  GetItemsAction,
  GetSizesAction,
})(Orders);
