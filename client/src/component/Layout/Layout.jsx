import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import classes from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <div className={classes.headerLayout_container}>
        <Header />
      </div>
      <div className={classes.mainLayout_container}>
        <main>{children}</main>
      </div>
      <div className={classes.footerLayout_container}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;