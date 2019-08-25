import React from 'react';
import Form from 'react-bootstrap/Form';
import { map } from 'lodash';

import logo from '../assets/gold_logo.png';
import logo2 from '../assets/gold_logo.jpg';
import Col from 'react-bootstrap/Col';

const MerchandiseItem = (props) => {
  console.log(props);
  const src = props.item.id >= 7 ? logo : logo2;
  function getSizes() {
    const options = map(props.sizes, (size) => {
      return (
        <option key={size.id}>{size.name}</option>
      )
    });
    return options;
  }
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return (
    <div className='merchandise-item'>
      <div className='merchandise-pic'>
        <img src={src} alt='logo' />
      </div>
      <div className='merchandise-else'>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Label>Size</Form.Label>
              <Form.Control as='select'>
                {getSizes()}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}  controlId="exampleForm.ControlInput2">
              <Form.Label>Qty</Form.Label>
              <Form.Control type='number' />
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
      <div className='merchandise-price'>Price: {formatter.format(props.item.price)}</div>
    </div>
  );
}

export default MerchandiseItem;
