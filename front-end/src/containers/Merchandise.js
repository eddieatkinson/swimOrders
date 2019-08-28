import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map, forEach, find } from 'lodash';
import Button from 'react-bootstrap/Button';

import GetItemsAction from '../redux/actions/GetItemsAction';
import CompleteFormAction from '../redux/actions/CompleteFormAction';
import SetPriceAction from '../redux/actions/SetPriceAction';

import MerchandiseItem from '../components/MerchandiseItem';
import { formatter } from '../utilities';

class Merchandise extends Component {
  state = {
    price: '',
    order: {
      1: {
        id: 1,
        // size: 1,
        size: 'notChosen',
        qty: 0,
      },
      2: {
        id: 2,
        // size: 1,
        size: 'notChosen',
        qty: 0,
      },
      3: {
        id: 3,
        // size: 1,
        size: 'notChosen',
        qty: 0,
      },
      4: {
        id: 4,
        // size: 4,
        size: 'notChosen',
        qty: 0,
      },
      5: {
        id: 5,
        // size: 1,
        size: 'notChosen',
        qty: 0,
      },
      6: {
        id: 6,
        // size: 1,
        size: 'notChosen',
        qty: 0,
      },
      8: {
        id: 8,
        // size: 1,
        size: 'notChosen',
        qty: 0,
      },
      10: {
        id: 10,
        // size: 4,
        size: 'notChosen',
        qty: 0,
      },
      11: {
        id: 11,
        // size: 4,
        size: 'notChosen',
        qty: 0,
      },
      14: {
        id: 14,
        // size: 4,
        size: 'notChosen',
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
        // special: 'Small - Red/White',
        special: 'notChosen',
      },
      20: {
        id: 20,
        qty: 0,
        // color: 'Green',
        color: 'notChosen',
      },
      24: {
        id: 24,
        qty: 0,
      },
    },
  }

  componentDidMount() {
    this.props.GetItemsAction();
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
    const price = document.getElementById('total-price').innerHTML;
    this.props.SetPriceAction(price);
    this.props.CompleteFormAction(this.state.order);
  }

  getPrice() {
    let basePrice = 0;
    forEach(this.state.order, (item, i) => {
      const thisItem = find(this.props.items, ['id', Math.floor(item.id)]);
      if(item.qty && thisItem) {
        const priceToUse = thisItem && item.size > 3 ? thisItem.adultPrice : thisItem.price;
        basePrice += item.qty * priceToUse;
      }
    });
    const priceToReturn = formatter.format(basePrice);
    return priceToReturn;
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
        <div id='total-price' className='running-total'>
          {this.getPrice()}
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
  SetPriceAction,
})(Merchandise);
