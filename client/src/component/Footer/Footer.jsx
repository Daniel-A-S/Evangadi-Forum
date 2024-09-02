import React from 'react'
import classes from "./Footer.module.css"
import Logo from "../../images/evangadi-logo-black.png"



function Footer() {
  return (
    <>
    <div className={classes.footer_wrapper}>
    <div className= {classes.Logo_Icon}>
      <img src={Logo} alt="" />
      {/* //facebook, instagram, twitter, linkedin, youtube icons// */}
    </div>
    <div className={classes.usefulLinks}>
      <ul> 
      <li>Useful Link</li>
      <li> Terms of Service</li>
      <li> Privacy Policy</li>
      </ul>
    </div>
    <div className={classes.contactUs}>
      <ul>
      <li> Contact Us </li>
      <li>support@Evangadi.com </li>
      <li>+1 202-386-2702</li>
      </ul>
    </div>
    </div>
    </>
  )
}

export default Footer;
