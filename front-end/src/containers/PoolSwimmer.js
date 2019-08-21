import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { map } from 'lodash';

import GetPoolsAction from '../redux/actions/GetPoolsAction';
import GetSwimmersAction from '../redux/actions/GetSwimmersAction';
import GetSizeAction from '../redux/actions/GetSizeAction';

class PoolSwimmer extends Component {
  state = {
    pool: null,
  }

  async componentDidMount() {
    await this.props.GetPoolsAction();
  }

  getOptions(field) {
    const options = map(this.props[field], (item) => {
      return (
        <option key={item.id}>{item.name}</option>
      )
    });
    return options;
  }

  handleChange(field, id) {
    const { selectedIndex } = document.getElementById(id);
    const thingOfInterest = this.props[field+'s'][selectedIndex - 1];
    this.setState({
      [field]: thingOfInterest,
    });
    field === 'pool' && this.props.GetSwimmersAction(selectedIndex);
    field === 'swimmer' && this.props.GetSizeAction(thingOfInterest.sizeId);
  }

  getSwimmersDropdown() {
    const id = "exampleForm.ControlSelect2";
    const swimmersDropdown = this.state.pool &&
      <Form.Group controlId={id}>
        <Form.Control as="select" onChange={() => this.handleChange('swimmer', id)}>
          <option>Select swimmer...</option>
          {this.getOptions('swimmers')}
        </Form.Control>
        <Form.Text className="text-muted">
          Start typing your swimmer's name or select it from the dropdown.
        </Form.Text>
      </Form.Group>;
    return swimmersDropdown;
  }

  getSize() {
    return (
      <div>{this.props.size[0] && this.props.size[0].size}</div>
    )
  }

  render() {
    const poolDropdownId = "exampleForm.ControlSelect1";
    return(
      <div className='pool-swimmer-container'>
        <Form className='wrapper pool-swimmer-content'>
          <Form.Group controlId={poolDropdownId}>
            <Form.Control as="select" onChange={() => this.handleChange('pool', poolDropdownId)}>
              <option>Select pool...</option>
              {this.getOptions('pools')}
            </Form.Control>
          </Form.Group>
          {this.getSwimmersDropdown()}
          {this.getSize()}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pools: state.data.pools,
    swimmers: state.data.swimmers,
    size: state.data.size,
  }
}

export default connect(mapStateToProps, {
  GetPoolsAction,
  GetSwimmersAction,
  GetSizeAction,
})(PoolSwimmer);
