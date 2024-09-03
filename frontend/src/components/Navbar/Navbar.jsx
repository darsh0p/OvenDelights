import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL and scroll to the corresponding element
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Set active menu based on the current path
    if (location.pathname === "/cart") {
      setMenu("cart");
    } else if (location.pathname === "/") {
      setMenu("home");
    }

  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  const handleMenuClick = (menuName) => {
    setMenu(menuName);
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => handleMenuClick("home")}>
        <img className='logo' src={assets.logo} alt="Logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => handleMenuClick("home")}
          className={`${menu === "home" ? "active" : ""}`}>
          Home
        </Link>
        <Link
          to="/#explore-menu"
          onClick={() => handleMenuClick("menu")}
          className={`${menu === "menu" ? "active" : ""}`}>
          Menu
        </Link>
        <Link
          to="/#app-download"
          onClick={() => handleMenuClick("mob-app")}
          className={`${menu === "mob-app" ? "active" : ""}`}>
          Mobile App
        </Link>
        <Link
          to="/#footer"
          onClick={() => handleMenuClick("contact")}
          className={`${menu === "contact" ? "active" : ""}`}>
          Contact Us
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <Link
          to='/cart'
          className={`navbar-search-icon ${menu === "cart" ? "active" : ""}`}
          onClick={() => handleMenuClick("cart")}
        >
          <img src={assets.basket_icon} alt="Basket Icon" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Bag Icon" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout Icon" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
