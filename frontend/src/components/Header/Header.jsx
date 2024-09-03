import React from 'react';
import './Header.css';

const Header = () => {
  
  const scrollToMenu = () => {
    const menuSection = document.getElementById('explore-menu');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
      <div className='header-contents'>
        <h2>
          <span>Order your favourite</span><br />
          <span>food here</span>
        </h2>
        <button onClick={scrollToMenu}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
