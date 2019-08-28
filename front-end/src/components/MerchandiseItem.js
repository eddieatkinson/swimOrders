import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { map } from 'lodash';
import { MdAddCircle } from 'react-icons/md';

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
  const [newRows, setNewRows] = useState(0);
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
    const sizesArrayCopy = [...props.sizes];
    const lastElement = sizesArrayCopy.pop();
    if (props.item.id === 3) {
      sizesArrayCopy.splice(3, 0, lastElement);
    }
    const options = map(sizesArrayCopy, (size, i) => {
      if (!!props.item.onlyAdult) {
        if (i > 2) {
          return (
            <option value={size.id} key={size.id}>{size.name}</option>
          );
        }
      } else {
        return (
          <option value={size.id} key={size.id}>{size.name}</option>
        );
      }
    });
    return options;
  }

  const getJumpRopeSizeColors = () => {
    const jumpRopeSizes = [
      'Small - Red/White',
      'Medium - Black/White',
      'Large - Black/Red',
    ];
    const options = map(jumpRopeSizes, (size, i) => {
      return (
        <option key={i} value={size}>{size}</option>
      );
    });
    return options;
  }

  const getStretchCordColors = () => {
    const stretchCordColors = [
      'Green',
      'Red',
      'Blue',
      'Black',
      'Gray, for the MIGHTIEST of ALL!!!',
    ];
    const options = map(stretchCordColors, (color, i) => {
      return (
        <option key={i} value={color}>{color}</option>
      );
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
    props.amendOrder(props.item.id, {
      ...props.order[props.item.id],
      [field]: valueId,
    });
  }

  const handleJumpRopeSelect = (e) => {
    let value = e.target.value;
    props.amendOrder(props.item.id, {
      ...props.order[props.item.id],
      special: value,
    });
  }

  const handleStretchCordSelect = (e) => {
    let value = e.target.value;
    props.amendOrder(props.item.id, {
      ...props.order[props.item.id],
      color: value,
    });
  }

  const handleExtraSize = (e, field, newRowNum) => {
    const newId = props.item.id + newRowNum/100;
    let valueId = parseInt(e.target.value);
    if(isNaN(valueId)) {
      valueId = 0;
    }
    props.amendOrder(newId, {
      ...props.order[newId],
      id: newId,
      [field]: valueId,
    });
  }

  const handleExtraJumpRopes = (e, newRowNum) => {
    const newId = props.item.id + newRowNum/100;
    let value = e.target.value;
    props.amendOrder(newId, {
      ...props.order[newId],
      id: newId,
      special: value,
    });
  }

  const handleExtraStretchCords = (e, newRowNum) => {
    const newId = props.item.id + newRowNum/100;
    let value = e.target.value;
    props.amendOrder(newId, {
      ...props.order[newId],
      id: newId,
      color: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const getPrices = () => {
    const prices = props.item.price === props.item.adultPrice ? formatter.format(props.item.price) :
      `${formatter.format(props.item.price)} - ${formatter.format(props.item.adultPrice)}`;
    return prices;
  }

  const disabled = props.order[props.item.id].size === 'notChosen' || props.order[props.item.id].special === 'notChosen' || props.order[props.item.id].color === 'notChosen'; 

  const selectionSectionTitle = (props.order[props.item.id].size && 'size') || (props.order[props.item.id].special && 'size/color') || (props.order[props.item.id].color && 'color');
  const placeholder = disabled && `Please select a ${selectionSectionTitle} first.`;

  const getFormRow = (newRowNum) => {
    const newId = props.item.id + newRowNum/100;
    const disabledNew = props.order[newId] && (!props.order[newId].size || !props.order[newId].special || !props.order[newId].color);
    const selectionSectionTitleNew = props.order[props.item.id] && ((props.order[props.item.id].size && 'size') || (props.order[props.item.id].special && 'size/color') || (props.order[props.item.id].color && 'color'));
    const placeholderNew = !disabledNew && `Please select a ${selectionSectionTitleNew} first.`;
    
    const formRow = 
      <Form.Row className='new-form-row'>
          {
            props.item.itemTypeId === 1 &&
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Label>Size</Form.Label>
              <Form.Control as='select' onChange={(e) => handleExtraSize(e, 'size', newRowNum)}>
                <option selected disabled>Select size...</option>
                {getSizes()}
              </Form.Control>
            </Form.Group>
          }
          {
            props.item.itemTypeId === 3 &&
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Label>Size/Color</Form.Label>
              <Form.Control as='select' onChange={e => handleExtraJumpRopes(e, newRowNum)}>
                <option selected disabled>Select size/color...</option>
                {getJumpRopeSizeColors()}
              </Form.Control>
            </Form.Group>
          }
          {
            props.item.itemTypeId === 4 &&
            <Form.Group as={Col} controlId="exampleForm.ControlInput1">
              <Form.Label>Color</Form.Label>
              <Form.Control as='select' onChange={e => handleExtraStretchCords(e, newRowNum)}>
                <option selected disabled>Select color...</option>
                {getStretchCordColors()}
              </Form.Control>
            </Form.Group>
          }
        <Form.Group as={Col}  controlId="exampleForm.ControlInput2">
          <Form.Label>Qty</Form.Label>
          <Form.Control disabled={!disabledNew} placeholder={placeholderNew} type='number' onChange={(e) => handleExtraSize(e, 'qty', newRowNum)} />
        </Form.Group>
        <div className='add-circle'><MdAddCircle style={{visibility: 'hidden'}} size='30px' /></div>
      </Form.Row>
    return formRow;
  }

  return (
    <div className='merchandise-item'>
      <div className='merchandise-pic'>
        <div className='price-text'>{getPrices()}</div>
        <div className='merchandise-name'>{props.item.item}</div>
        <img src={src} alt='logo' />
      </div>
      <div className='merchandise-else'>
        <Form id='merch-form' onSubmit={handleSubmit}>
          <Form.Row>
            {
              props.item.itemTypeId === 1 &&
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Size</Form.Label>
                <Form.Control as='select' onChange={(e) => handleChange(e, 'size')}>
                  <option selected disabled>Select size...</option>
                  {getSizes()}
                </Form.Control>
              </Form.Group>
            }
            {
              props.item.itemTypeId === 3 &&
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Size/Color</Form.Label>
                <Form.Control as='select' onChange={e => handleJumpRopeSelect(e)}>
                  <option selected disabled>Select size/color...</option>
                  {getJumpRopeSizeColors()}
                </Form.Control>
              </Form.Group>
            }
            {
              props.item.itemTypeId === 4 &&
              <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                <Form.Label>Color</Form.Label>
                <Form.Control as='select' onChange={e => handleStretchCordSelect(e)}>
                  <option selected disabled>Select color...</option>
                  {getStretchCordColors()}
                </Form.Control>
              </Form.Group>
            }
            <Form.Group as={Col}  controlId="exampleForm.ControlInput2">
              <Form.Label>Qty</Form.Label>
              <Form.Control placeholder={placeholder} disabled={disabled} type='number' onChange={(e) => handleChange(e, 'qty')} />
            </Form.Group>
            <div className='add-circle'>
              {
                props.item.itemTypeId !== 2 &&
                <MdAddCircle onClick={() => setNewRows(newRows + 1)} size='30px' color='#F5CE24' />
              }
            </div>
          </Form.Row>
          {
            newRows > 0 &&
            getFormRow(1)
          }
          {
            newRows > 1 &&
            getFormRow(2)
          }
          {
            newRows > 2 &&
            getFormRow(3)
          }
          {
            newRows > 3 &&
            getFormRow(4)
          }
          {
            newRows > 4 &&
            getFormRow(5)
          }
          {
            newRows > 5 &&
            getFormRow(6)
          }
          {
            newRows > 6 &&
            getFormRow(7)
          }
          {
            newRows > 7 &&
            getFormRow(8)
          }
          {
            newRows > 8 &&
            getFormRow(9)
          }
          {
            newRows > 9 &&
            getFormRow(10)
          }
          {
            newRows > 10 &&
            getFormRow(11)
          }
          {
            newRows > 11 &&
            getFormRow(12)
          }
          {
            newRows > 12 &&
            getFormRow(13)
          }
          {
            newRows > 13 &&
            getFormRow(14)
          }
          {
            newRows > 14 &&
            getFormRow(15)
          }
          {
            newRows > 15 &&
            getFormRow(16)
          }
          {
            newRows > 16 &&
            getFormRow(17)
          }
          {
            newRows > 17 &&
            getFormRow(18)
          }
          {
            newRows > 18 &&
            getFormRow(19)
          }
          {
            newRows > 19 &&
            getFormRow(20)
          }
          {
            newRows > 20 &&
            getFormRow(21)
          }
          {
            newRows > 21 &&
            getFormRow(22)
          }
          {
            newRows > 22 &&
            getFormRow(23)
          }
          {
            newRows > 23 &&
            getFormRow(24)
          }
        </Form>
      </div>
      {/* <div className='merchandise-price'>Price: {formatter.format(qty * props.item.price)}</div> */}
    </div>
  );
}

export default MerchandiseItem;
