import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';

import GetItemsAction from '../redux/actions/GetItemsAction';
import MerchandiseItem from '../components/MerchandiseItem';


class Merchandise extends Component {
  componentDidMount() {
    this.props.GetItemsAction()
  }
  render() {
    console.log(this.props);
    return(
      <div>
        {map(this.props.items, (item, i) => {
          return (
            <MerchandiseItem key={i} item={item} sizes={this.props.sizes} />
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
