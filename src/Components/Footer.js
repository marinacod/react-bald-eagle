import React from 'react';
import styles from './Footer.module.css';
import { BsLinkedin } from 'react-icons/bs';
import { FaGithubSquare } from 'react-icons/fa';
//import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';

function Footer() {
  const today = new Date();

  const thisYear = today.getFullYear();

  return (
    <footer className={styles.footer}>
      <p>Maryna Radchenko &copy;{thisYear}</p>
      <a href="https://codethedream.org/" target="_blank" rel="noreferrer">
        CTD project
      </a>

      <a href="https://github.com/marinacod" target="_blank" rel="noreferrer">
        <FaGithubSquare />
      </a>
      <a
        href="https://www.linkedin.com/in/maryna-radchenko-158ba7143/"
        target="_blank"
        rel="noreferrer"
      >
        <BsLinkedin />
      </a>
    </footer>
  );
}
export default Footer;
