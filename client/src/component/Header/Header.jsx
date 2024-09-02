import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./Header.module.css"
import Logo from "../../images/evangadi-logo-black.png"

const Header = () => {
  return (
    <section className={classes.Header_container}>
    <div className={classes.Header_logo}>
      <img src={Logo} alt="Evangadi-Logo" />
      </div>
      <div className={classes.list}>
          <div className={classes.Link_container}>
        <Link to ="/" >
          Home
        </Link>
        <Link to ="/answers">
          Answers
        </Link>
        <Link to ="/login">
          Logout
        </Link>
        </div>
      </div>
    </section>
  )
}

export default Header;
