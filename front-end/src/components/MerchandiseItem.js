import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { map } from 'lodash';

import logo from '../assets/gold_logo.png';
// import logo2 from '../assets/gold_logo.jpg';
import pic1 from '../assetsTemp/pic1.jpg';
import pic2 from '../assetsTemp/pic2.jpg';
import pic3 from '../assetsTemp/pic3.jpg';
import pic4 from '../assetsTemp/pic4.jpg';
import pic5 from '../assetsTemp/pic5.jpg';
import pic6 from '../assetsTemp/pic6.jpg';
import pic7 from '../assetsTemp/pic7.jpg';
import pic8 from '../assetsTemp/pic8.jpg';
import pic9 from '../assetsTemp/pic9.jpg';
import pic10 from '../assetsTemp/pic10.jpg';
import pic11 from '../assetsTemp/pic11.jpg';
import pic14 from '../assetsTemp/pic14.jpg';
import pic15 from '../assetsTemp/pic15.jpg';
import pic17 from '../assetsTemp/pic17.jpg';
import pic19 from '../assetsTemp/pic19.jpg';
import pic20 from '../assetsTemp/pic20.jpg';
import pic21 from '../assetsTemp/pic21.jpg';

import Col from 'react-bootstrap/Col';

const MerchandiseItem = (props) => {
  const [qty, setQty] = useState(0);
  const [size, setSize] = useState(1);
  const [order, setOrder] = useState({size: 1, qty: 0});
  // console.log(props);
  // const src = props.item.id >= 7 ? logo : logo2;
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
    case 7:
      src = pic7;
      break;
    case 8:
      src = pic8;
      break;
    case 9:
      src = pic9;
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
    case 21:
      src = pic21;
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

  // const handleSize = (e) => {
  //   setSize(e.target.value)
  // }

  const handleChange = async (e, field) => {
    let valueId = parseInt(e.target.value);
    console.log(valueId);
    if(isNaN(valueId)) {
      valueId = 0;
    }
    console.log(valueId);
    if(field === 'size') {
      await setSize(valueId);
    } else if (field === 'qty') {
      await setQty(valueId);
    }
    // await setOrder({
    //   ...order,
    //   [field]: valueId,
    // });
    // setOrder(previous => {
    //   return {
    //     ...previous,
    //     [field]: valueId,
    //   }
    // });
    // props.amendOrder(props.item.id, newOrder);
    console.log(props.order[props.item.id]);
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
    // useEffect(() => {
    //   console.log(order);
    //   props.amendOrder(props.item.id, order);
    // });
  }

  // useEffect(() => {
  //   console.log(order);
  //   // props.amendOrder(props.item.id, order);
  // });
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  // const handleQuantity = (event) => {
  //   setQty(event.target.value);
  // }

  // const options = [
  //   {
  //     id: 1,
  //     name: 'Option 1',
  //   },
  //   {
  //     id: 2,
  //     name: 'Option 2',
  //   },
  //   {
  //     id: 3,
  //     name: 'Option 3',
  //   },
  // ]

  // const getOptions = () => {
  //   return (
  //     map(options, (option, i) => {
  //       return (
  //         <option key={i} value={option.id}>{option.name}</option>
  //       )
  //     })
  //   )
  // }

  // const handleTest = (e) => {
  //   console.log(e.target.value);
  // }

  // console.log(order);
  // // props.amendOrder(props.item.id, order);

  return (
    <div className='merchandise-item'>
      <div className='merchandise-pic'>
        <div className='merchandise-name'>{props.item.item}</div>
        <img src={src} alt='logo' />
      </div>
      <div className='merchandise-else'>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Label>Size</Form.Label>
              <Form.Control as='select' onChange={(e) => handleChange(e, 'size')}>
                {getSizes()}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}  controlId="exampleForm.ControlInput2">
              <Form.Label>Qty</Form.Label>
              <Form.Control type='number' onChange={(e) => handleChange(e, 'qty')} />
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
      <div className='merchandise-price'>Price: {formatter.format(qty * props.item.price)}</div>
    </div>
  );
}

export default MerchandiseItem;
