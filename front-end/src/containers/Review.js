import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forEach, map, find } from 'lodash';
import ReviewItem from '../components/ReviewItem';

class Review extends Component {
  getReviewItems() {
    const reviewItemsArray = [];
    forEach(this.props.order, (value, key) => {
      if (value.qty > 0) {
        const name = find(this.props.items, ['id', parseInt(key)]).item;
        const size = find(this.props.sizes, ['id', parseInt(value.size)]).name;
        reviewItemsArray.push(
          {id: key, order: value, name, size}
        );
      }
    });
    return reviewItemsArray;
  }
  render() {
    const reviewItemsArray = this.getReviewItems();
    return (
      <div>
        <div>
          {map(reviewItemsArray, (item, i) => {
            console.log(item);
            return (
              <ReviewItem key={i} itemId={parseInt(item.id)} orderInfo={item.order} name={item.name} size={item.size} />
            )
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.data.order,
    sizes: state.data.sizes,
    items: state.data.items,
  }
}

export default connect(mapStateToProps)(Review);
