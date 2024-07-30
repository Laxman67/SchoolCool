import './NavBar.css';
import PropTypes from 'prop-types';
import assets from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  return (
    <nav>
      <div className="nav-conatiner">
        <Link to="/">
          <div className="nav-logo">
            <img src={assets.Logo} alt="Logo" />
          </div>
        </Link>
        <div className="nav-links">
          <ul>
            <Link
              to="/"
              onClick={() => {
                setMenu('home');
              }}
              className={menu == 'home' ? 'active' : ''}
            >
              <p>Home</p>
            </Link>
            <Link
              to="/contact"
              onClick={() => {
                setMenu('contact');
              }}
              className={menu == 'contact' ? 'active' : ''}
            >
              <p>Contact</p>
            </Link>
            <Link
              to="/about"
              onClick={() => {
                setMenu('about');
              }}
              className={menu == 'about' ? 'active' : ''}
            >
              <p>About</p>
            </Link>
            <Link
              to="/gallery"
              onClick={() => {
                setMenu('gallery');
              }}
              className={menu == 'gallery' ? 'active' : ''}
            >
              <p>Gallery</p>
            </Link>
          </ul>
        </div>
        <div className="nav-login-signup">
          <div className="login-signup-btn">
            <p
              onClick={() => {
                setShowLogin(true);
              }}
            >
              LOGIN
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};
export default NavBar;
