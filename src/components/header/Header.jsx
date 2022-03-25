import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import cartIcon from '../../assets/cart-icon.png';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/features/application';
import HeaderModal from './HeaderModal';

const Header = () => {
  const dispatch = useDispatch();

  const [contacts, setContacts] = useState(false);

  const exit = () => {
    dispatch(logOut());
  };

  const check = () => {
    setContacts(!contacts);
  };

  const closeModal = () => {
    setContacts(false);
  };

  const token = useSelector((state) => state.application.token);

  return token ? (
    <header>
      <Link to="/">
        <img className={styles.logoImage} src={logo} alt="pictur" />
      </Link>
      <nav>
        <Link to="/reviews">
          <a>О нас</a>
        </Link>
        <a onClick={check}>Контакты</a>
        {contacts ? <HeaderModal /> : ''}
      </nav>
      <Link to="/cartpage">
        <img className={styles.cartIcon} src={cartIcon} alt="carticon" />
      </Link>
      <Link to="/signin">
        <button onClick={exit} className={styles.signInBtn}>
          Выход
        </button>
      </Link>
    </header>
  ) : (
    <header>
      <Link to="/">
        <img className={styles.logoImage} src={logo} alt="pictur" />
      </Link>
      <nav>
        <a>О нас</a>
        <a onClick={check}>Контакты</a>
        {contacts ? <HeaderModal /> : ''}
      </nav>
      <Link to="/cartpage">
        <img className={styles.cartIcon} src={cartIcon} alt="carticon" />
      </Link>
      <Link to="/signin">
        <button className={styles.signInBtn}>Войти</button>
      </Link>
    </header>
  );
};

export default Header;
