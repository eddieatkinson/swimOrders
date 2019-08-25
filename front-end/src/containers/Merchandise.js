import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

import GetItemsAction from '../redux/actions/GetItemsAction';
import MerchandiseItem from '../components/MerchandiseItem';


class Merchandise extends Component {
  state = {
    order: {},
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
