import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

import GetItemsAction from '../redux/actions/GetItemsAction';
import MerchandiseItem from '../components/MerchandiseItem';


class Merchandise extends Component {
  state = {
    order: {
      1: {
        size: 1,
        qty: 0,
      },
      2: {
        size: 1,
        qty: 0,
      },
      3: {
        size: 1,
        qty: 0,
      },
      4: {
        size: 1,
        qty: 0,
      },
      5: {
        size: 1,
        qty: 0,
      },
      6: {
        size: 1,
        qty: 0,
      },
      7: {
        size: 1,
        qty: 0,
      },
      8: {
        size: 1,
        qty: 0,
      },
      9: {
        size: 1,
        qty: 0,
      },
      10: {
        size: 1,
        qty: 0,
      },
      11: {
        size: 1,
        qty: 0,
      },
      14: {
        size: 1,
        qty: 0,
      },
      15: {
        size: 1,
        qty: 0,
      },
      17: {
        size: 1,
        qty: 0,
      },
      19: {
        size: 1,
        qty: 0,
      },
      20: {
        size: 1,
        qty: 0,
      },
      21: {
        size: 1,
        qty: 0,
      },
    },
  }

  componentDidMount() {
    this.props.GetItemsAction()
  }

  amendOrder(itemId, merchandiseInfo) {
    console.log(merchandiseInfo);
    this.setState(() => ({
      order: {
        ...this.state.order,
        [itemId]: merchandiseInfo,
      }
    }));
  }

  render() {
    console.log(this.state.order);
    return(
      <div>
        {map(this.props.items, (item, i) => {
          return (
            <MerchandiseItem order={this.state.order} amendOrder={this.amendOrder.bind(this)} key={i} item={item} sizes={this.props.sizes} />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.data.items,
    sizes: state.data.sizes,
  }
}

export default connect(mapStateToProps, {
  GetItemsAction,
})(Merchandise);
