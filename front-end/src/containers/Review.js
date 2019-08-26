import React, { Component } from 'react';
import { connect } from 'react-redux';
import { forEach, map, find } from 'lodash';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import ReviewItem from '../components/ReviewItem';

import { emailCheck } from '../utilities';

import RestartFormAction from '../redux/actions/RestartFormAction';
import SubmitOrderAction from '../redux/actions/SubmitOrderAction';


class Review extends Component {
  state = {
    email: '',
    name: '',
    phone: '',
  }
  getReviewItems() {
    const reviewItemsArray = [];
    forEach(this.props.order, (value, key) => {
      if (value.qty > 0) {
        const name = find(this.props.items, ['id', parseInt(key)]).item;
        const size = value.size && find(this.props.sizes, ['id', parseInt(value.size)]).name;
        reviewItemsArray.push(
          {id: key, order: value, name, size}
        );
      }
    });
    return reviewItemsArray;
  }
  handleChange(e, field) {
    const value = e.target.value;
    this.setState({
      [field]: value,
    });
  }
  handleRestart() {
    this.props.RestartFormAction();
  }
  async handleSubmit() {
    console.log(this.props.order);
    const { email, name, phone } = this.state;
    const senderInfo = {
      ...this.state,
      swimmerId: this.props.swimmer.id,
    }
    if (name === '' || email === '' || phone === '') {
      alert('All fields must be filled.');
    } else if (!email.match(emailCheck)) {
      alert('Please enter a valid email address.');
    } else {
      const response = await this.props.SubmitOrderAction(senderInfo, this.props.order);
      console.log(response);
      if (response.payload && response.payload.msg === 'orderSuccess') {
        alert('Your order has been placed!');
        document.location.reload(true); // reload page to start over
      }
    }
  }
  render() {
    const reviewItemsArray = this.getReviewItems();
    return (
      <div>
        <div>
          {map(reviewItemsArray, (item, i) => {
            return (
              <ReviewItem key={i} itemId={parseInt(item.id)} orderInfo={item.order} name={item.name} size={item.size} />
            )
          })}
        </div>
        <Form className='review-form'>
          <Form.Row>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e) => this.handleChange(e, 'email')} type="email" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput2">
                <Form.Label>Your Name</Form.Label>
                <Form.Control onChange={(e) => this.handleChange(e, 'name')} type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control onChange={(e) => this.handleChange(e, 'phone')} type="text" />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
        <div className='submit-button'>
          <Button onClick={this.handleRestart.bind(this)} variant='outline-primary'>Start Over</Button>
          <Button onClick={this.handleSubmit.bind(this)} type='submit'>Submit</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    swimmer: state.data.swimmer,
    order: state.data.order,
    sizes: state.data.sizes,
    items: state.data.items,
  }
}

export default connect(mapStateToProps, {
  RestartFormAction,
  SubmitOrderAction,
})(Review);
