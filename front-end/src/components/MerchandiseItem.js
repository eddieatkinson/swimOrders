import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { map } from 'lodash';

import { formatter } from '../utilities';

import logo from '../assets/gold_logo.png';
import pic1 from '../assets/Team Shirt-2413.jpg';
import pic2 from '../assets/Team Hoodie-2389.jpg';
import pic3 from '../assets/Long Sleeve Shirt-2404.jpg';
import pic4 from '../assets/Womens Long Sleeve Shirt-2457.jpg';
import pic5 from '../assets/Shorts-2448.jpg';
import pic6 from '../assets/PJ Pants-2374.jpg';
import pic8 from '../assets/Zip Hoodie-2393.jpg';
import pic10 from '../assets/Womens Vneck-2429.jpg';
import pic11 from '../assets/Mens Polo-2367.jpg';
import pic14 from '../assets/Womens Polo-2440.jpg';
import pic15 from '../assets/Swim Cap-2425.jpg';
import pic17 from '../assets/Car Magnet-2362.jpg';
import pic19 from '../assets/Jump Rope-2382.jpg';
import pic20 from '../assets/Stretch Cords-2376.jpg';
import pic24 from '../assets/Nike Hat-2415.jpg';

import Col from 'react-bootstrap/Col';

const MerchandiseItem = (props) => {
  const [qty, setQty] = useState(0);
  const [size, setSize] = useState(1);
  const [order, setOrder] = useState({size: 1, qty: 0});
  let src;
  switch (props.item.id) {
    case 1:
      src = pic1;
      break;
    case 2:
      src = pic2;
      break;
    case 3:
      src = pic3;
      break;
    case 4:
      src = pic4;
      break;
    case 5:
      src = pic5;
      break;
    case 6:
      src = pic6;
      break;
    case 8:
      src = pic8;
      break;
    case 8:
      src = pic8;
      break;
    case 10:
      src = pic10;
      break;
    case 11:
      src = pic11;
      break;
    case 14:
      src = pic14;
      break;
    case 15:
      src = pic15;
      break;
    case 17:
      src = pic17;
      break;
    case 19:
      src = pic19;
      break;
    case 20:
      src = pic20;
      break;
    case 24:
      src = pic24;
      break;
    default:
      src = logo;
      break;
  }
  const getSizes = () => {
    const options = map(props.sizes, (size) => {
      return (
        <option value={size.id} key={size.id}>{size.name}</option>
      )
    });
    return options;
  }

  const handleChange = async (e, field) => {
    let valueId = parseInt(e.target.value);
    if(isNaN(valueId)) {
      valueId = 0;
    }
    if(field === 'size') {
      await setSize(valueId);
    } else if (field === 'qty') {
      await setQty(valueId);
    }
    if(!props.order[props.item.id]) {
      await props.amendOrder(props.item.id, {
        size: 1,
        qty: 0,
      });
      props.amendOrder(props.item.id, {
        ...props.order[props.item.id],
        [field]: valueId,
      });
    } else {
      props.amendOrder(props.item.id, {
        ...props.order[props.item.id],
        [field]: valueId,
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const getPrices = () => {
    const prices = props.item.price === props.item.adultPrice ? formatter.format(props.item.price) :
      `${formatter.format(props.item.price)} - ${formatter.format(props.item.adultPrice)}`;
    return prices;
  }

  console.log(props.item);

  return (
    <div className='merchandise-item'>
      <div className='merchandise-pic'>
        <div className='price-text'>{getPrices()}</div>
        <div className='merchandise-name'>{props.item.item}</div>
        <img src={src} alt='logo' />
      </div>
      <div className='merchandise-else'>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            {
              props.item.itemTypeId !== 2 &&
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Size</Form.Label>
                <Form.Control as='select' onChange={(e) => handleChange(e, 'size')}>
                  {getSizes()}
                </Form.Control>
              </Form.Group>
            }
            <Form.Group as={Col}  controlId="exampleForm.ControlInput2">
              <Form.Label>Qty</Form.Label>
              <Form.Control type='number' onChange={(e) => handleChange(e, 'qty')} />
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
      {/* <div className='merchandise-price'>Price: {formatter.format(qty * props.item.price)}</div> */}
    </div>
  );
}

export default MerchandiseItem;
