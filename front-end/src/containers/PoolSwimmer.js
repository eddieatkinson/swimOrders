import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { map, findIndex, find } from 'lodash';

import GetPoolsAction from '../redux/actions/GetPoolsAction';
import GetSizesAction from '../redux/actions/GetSizesAction';
import GetSwimmersAction from '../redux/actions/GetSwimmersAction';
import GetSizeAction from '../redux/actions/GetSizeAction';
import UpdateSizeAction from '../redux/actions/UpdateSizeAction';
import SetSwimmerAction from '../redux/actions/SetSwimmerAction';

class PoolSwimmer extends Component {
  state = {
    pool: null,
    swimmer: null,
    size: null,
    showModal: false,
    sizeChangedTo: null,
    disableModalSubmit: true,
  }

  componentDidMount() {
    this.props.GetPoolsAction();
    this.props.GetSizesAction();
  }

  getOptions(field) {
    const options = map(this.props[field], (item, i) => {
      const selected = field === 'sizes' && findIndex(this.props.sizes, this.props.size[0]) === i;
      return (
        <option selected={selected} value={item.id} key={item.id}>{item.name}</option>
      )
    });
    return options;
  }

  handleChange(event, field, id) {
    const thingId = parseInt(event.target.value)
    // const { selectedIndex } = document.getElementById(id);
    // const indexCorrection = field === 'size' ? 0 : -1
    // const thingOfInterest = this.props[field+'s'][selectedIndex + indexCorrection];
    // console.log(this.props[field+'s']);
    const thingOfInterest = find(this.props[field+'s'], ['id', thingId]);
    // console.log(thingOfInterest);
    this.setState({
      [field]: thingOfInterest,
    });
    field === 'pool' && this.props.GetSwimmersAction(thingId);
    field === 'swimmer' && this.props.GetSizeAction(thingOfInterest.usedSizeId);
    field === 'swimmer' && this.props.SetSwimmerAction(thingOfInterest);
  }

  getSwimmersDropdown() {
    const id = "exampleForm.ControlSelect2";
    const swimmersDropdown = this.state.pool &&
      <Form.Group controlId={id}>
        <Form.Label>Swimmer</Form.Label>
        <Form.Control as="select" onChange={(e) => this.handleChange(e, 'swimmer', id)}>
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
          placeholder={this.props.size && this.props.size[0] && this.props.size[0].name}
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
    if(event.target.value === this.state.swimmer.name) {
      this.setState({
        disableModalSubmit: false,
      });
    }
  }

  async handleSubmitNewSize() {
    const sizeChangeInput = {
      usedSizeId: this.state.size.id,
      swimmerId: this.state.swimmer.id,
    }
    await this.props.UpdateSizeAction(sizeChangeInput);
    if (this.props.successMessage && this.props.successMessage.msg === 'sizeUpdateSuccess') {
      await this.handleClose();
      this.props.GetSizeAction(this.state.size.id);
      alert('You\'re swimmer\'s size has been successfully updated!');
    } else {
      alert('An error has occurred.');
    }
  }

  getConfirmationSignature() {
    const selectedIndex = document.getElementById("exampleForm.ControlSelect3") && document.getElementById("exampleForm.ControlSelect3").selectedIndex;
    const confirmationSignature = (selectedIndex || selectedIndex === 0) && selectedIndex !== findIndex(this.props.sizes, this.props.size[0]) &&
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
              <Form.Control as="select" onChange={(e) => this.handleChange(e, 'size', 'exampleForm.ControlSelect3')}>
                {this.getOptions('sizes')}
              </Form.Control>
            </Form.Group>
            {this.getConfirmationSignature()}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.handleClose.bind(this)}>Cancel</Button>
          <Button disabled={this.state.disableModalSubmit} variant='primary' onClick={this.handleSubmitNewSize.bind(this)}>Submit</Button>
        </Modal.Footer>
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
            <Form.Control as="select" onChange={(e) => this.handleChange(e, 'pool', poolDropdownId)}>
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
    swimmer: state.data.swimmer,
    sizes: state.data.sizes,
    size: state.data.size,
    successMessage: state.data.successMessage,
  }
}

export default connect(mapStateToProps, {
  GetPoolsAction,
  GetSizesAction,
  GetSwimmersAction,
  GetSizeAction,
  UpdateSizeAction,
  SetSwimmerAction,
})(PoolSwimmer);
