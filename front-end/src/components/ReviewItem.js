import React from 'react';

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

const ReviewItem = props => {
  let src;
  switch (props.itemId) {
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

  console.log(props);

  return (
    <div className='merchandise-item'>
      <div className='merchandise-pic'>
        <div className='merchandise-name'>{props.name}</div>
        <img src={src} alt='logo' />
      </div>
      <div className='merchandise-else'>
        <div>{props.size}</div>
      </div>
    </div>
  );
}

export default ReviewItem;
