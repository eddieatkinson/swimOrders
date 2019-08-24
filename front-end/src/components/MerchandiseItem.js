import React from 'react';
import logo from '../assets/gold_logo.png';

const MerchandiseItem = (props) => {
  console.log(props.item.id);
  return (
    <div>
      <img src='https://eddie-first-test-bucket.s3.us-east-2.amazonaws.com/assets/gold_logo.jpg' alt='logo' />
      <div className='navbar-text'>Merchandise Item</div>
    </div>
  );
}

export default MerchandiseItem;
