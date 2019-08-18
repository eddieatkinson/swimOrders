import React from 'react';
import logo from '../assets/gold_logo.png';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <img src={logo} alt='logo' />
      <div className='navbar-text'>Merchandise Order Form</div>
    </div>
  );
}

export default Navbar;
