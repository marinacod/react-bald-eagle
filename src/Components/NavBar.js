import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBarLinks = [
  {
    title: 'Weekly Planner',
    path: '/weekly',
    className: styles.navButton,
  },
  {
    title: 'Grocery List',
    path: '/grocery',
    className: styles.navButton,
  },
  {
    title: 'Bucket List',
    path: '/bucket',
    className: styles.navButton,
  },
];

const NavBar = () => {
  return (
    <>
      <nav className={styles.navBarContainer}>
        {NavBarLinks.map((item, index) => {
          return (
            <NavLink key={index} to={item.path} className={item.className}>
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
export default NavBar;
