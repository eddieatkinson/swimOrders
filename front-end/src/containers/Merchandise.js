import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import Button from 'react-bootstrap/Button';

import GetItemsAction from '../redux/actions/GetItemsAction';
import CompleteFormAction from '../redux/actions/CompleteFormAction';

import MerchandiseItem from '../components/MerchandiseItem';

class Merchandise extends Component {
  state = {
    order: {
      1: {
        id: 1,
        size: 1,
        qty: 0,
      },
      2: {
        id: 2,
        size: 1,
        qty: 0,
      },
      3: {
        id: 3,
        size: 1,
        qty: 0,
      },
      4: {
        id: 4,
        size: 4,
        qty: 0,
      },
      5: {
        id: 5,
        size: 1,
        qty: 0,
      },
      6: {
        id: 6,
        size: 1,
        qty: 0,
      },
      8: {
        id: 8,
        size: 1,
        qty: 0,
      },
      10: {
        id: 10,
        size: 4,
        qty: 0,
      },
      11: {
        id: 11,
        size: 4,
        qty: 0,
      },
      14: {
        id: 14,
        size: 4,
        qty: 0,
      },
      15: {
        id: 15,
        qty: 0,
      },
      17: {
        id: 17,
        qty: 0,
      },
      19: {
        id: 19,
        qty: 0,
      },
      20: {
        id: 20,
        qty: 0,
      },
      24: {
        id: 24,
        qty: 0,
      },
    },
  }

  componentDidMount() {
    this.props.GetItemsAction()
  }

  amendOrder(itemId, merchandiseInfo) {
    this.setState(() => ({
      order: {
        ...this.state.order,
        [itemId]: merchandiseInfo,
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.CompleteFormAction(this.state.order);
  }

  render() {
    return(
      <div>
        {map(this.props.items, (item, i) => {
          return (
            <MerchandiseItem order={this.state.order} amendOrder={this.amendOrder.bind(this)} key={i} item={item} sizes={this.props.sizes} />
          )
        })}
        <div className='submit-button'>
          <Button onClick={this.handleSubmit.bind(this)} type='submit'>Review & Submit</Button>
        </div>
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
  CompleteFormAction,
})(Merchandise);
