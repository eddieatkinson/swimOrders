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
        {map(this.props.items, (item) => {
          return (
            <MerchandiseItem item={item} />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.data.items,
  }
}

export default connect(mapStateToProps, {
  GetItemsAction,
})(Merchandise);
