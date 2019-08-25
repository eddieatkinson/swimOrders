import React from 'react';

import logo from '../assets/gold_logo.png';
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

const ReviewItem = props => {
  let src;
  switch (parseInt(props.itemId)) {
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
