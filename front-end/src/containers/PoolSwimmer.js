import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { map, findIndex } from 'lodash';

import GetPoolsAction from '../redux/actions/GetPoolsAction';
import GetSizesAction from '../redux/actions/GetSizesAction';
import GetSwimmersAction from '../redux/actions/GetSwimmersAction';
import GetSizeAction from '../redux/actions/GetSizeAction';

class PoolSwimmer extends Component {
  state = {
    pool: null,
    swimmer: null,
    size: null,
    showModal: false,
    sizeChangedTo: null,
  }

  componentDidMount() {
    this.props.GetPoolsAction();
    this.props.GetSizesAction();
  }

  getOptions(field) {
    const options = map(this.props[field], (item, i) => {
      const selected = field === 'sizes' && findIndex(this.props.sizes, this.props.size[0]) === i;
      return (
        <option selected={selected} key={item.id}>{item.name}</option>
      )
    });
    return options;
  }

  handleChange(field, id) {
    const { selectedIndex } = document.getElementById(id);
    const indexCorrection = field === 'size' ? 0 : -1
    const thingOfInterest = this.props[field+'s'][selectedIndex + indexCorrection];
    this.setState({
      [field]: thingOfInterest,
    });
    field === 'pool' && this.props.GetSwimmersAction(selectedIndex);
    field === 'swimmer' && this.props.GetSizeAction(thingOfInterest.usedSizeId);
  }

  getSwimmersDropdown() {
    const id = "exampleForm.ControlSelect2";
    const swimmersDropdown = this.state.pool &&
      <Form.Group controlId={id}>
        <Form.Label>Swimmer</Form.Label>
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
    const size = this.state.swimmer && 
      <Form.Group>
        <Form.Label>Shirt Size</Form.Label>
        <Form.Control
          onClick={this.handleSizeClick.bind(this)}
          type="text"
          readOnly
          placeholder={this.props.size[0] && this.props.size[0].name}
        />
        <Form.Text className="text-muted">
          This is your swimmer's shirt size on file. Click on the field to change it.
        </Form.Text>
      </Form.Group>
    return size;
  }

  handleSizeClick() {
    this.setState({
      showModal: true,
    });
  }

  handleClose() {
    this.setState({
      showModal: false,
    });
  }

  handleSign(event) {
    console.log(event.target.value);
  }

  getConfirmationSignature() {
    const selectedIndex = document.getElementById("exampleForm.ControlSelect3") && document.getElementById("exampleForm.ControlSelect3").selectedIndex;
    console.log(selectedIndex);
    console.log(findIndex(this.props.sizes, this.props.size[0]));
    const confirmationSignature = selectedIndex && selectedIndex !== findIndex(this.props.sizes, this.props.size[0]) &&
      <Form.Group>
        <Form.Control type='text' onChange={this.handleSign.bind(this)} />
        <Form.Text className="text-muted">
          Type your swimmer's full name to confirm that you'd like to change the shirt size.
        </Form.Text>
      </Form.Group>;
    return confirmationSignature;
  }

  renderModal() {
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Change your swimmer's shirt size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='wrapper pool-swimmer-content'>
            <Form.Group controlId="exampleForm.ControlSelect3">
              <Form.Control as="select" onChange={() => this.handleChange('size', 'exampleForm.ControlSelect3')}>
                {this.getOptions('sizes')}
              </Form.Control>
            </Form.Group>
            {this.getConfirmationSignature()}
          </Form>
        </Modal.Body>
      </Modal>
    )
  }

  render() {
    const poolDropdownId = "exampleForm.ControlSelect1";
    return(
      <div className='pool-swimmer-container'>
        <Form className='wrapper pool-swimmer-content'>
          <Form.Group controlId={poolDropdownId}>
            <Form.Label>Pool</Form.Label>
            <Form.Control as="select" onChange={() => this.handleChange('pool', poolDropdownId)}>
              <option selected disabled>Select pool...</option>
              {this.getOptions('pools')}
            </Form.Control>
          </Form.Group>
          {this.getSwimmersDropdown()}
          {this.getSize()}
        </Form>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pools: state.data.pools,
    swimmers: state.data.swimmers,
    sizes: state.data.sizes,
    size: state.data.size,
  }
}

export default connect(mapStateToProps, {
  GetPoolsAction,
  GetSizesAction,
  GetSwimmersAction,
  GetSizeAction,
})(PoolSwimmer);
