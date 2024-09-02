import React from 'react'
import { useRef } from 'react';
import axios from "../../axiosConfig"
import { Link, useNavigate } from 'react-router-dom';
import classes from "./Login.module.css";


function Login() {

  const navigate = useNavigate();
  const emailDOM = useRef(null);
  const passwordDOM = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();

    const emailvalue = emailDOM.current.value;
    const passvalue = passwordDOM.current.value;

    if (!emailvalue || !passvalue) {
      alert("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post('users/login', {
        email: emailvalue,
        password: passvalue  
      });

      alert("login successful");
      localStorage.setItem('token', data.token);
      navigate('/');

    } catch (error) {
      alert(error?.response?.data?.message);
      console.error(error.response.data); 
    }
  }

  return (
    <>
    <div className={classes.container}>
      <div className={classes.login_container}>
        <div className={classes.text_container}>
        <h4>Login to your account</h4>
        <br />
        <h4>Don't have an account? <Link to="/register">Create a new account </Link></h4>
        <br /> 
        </div>
        <div className={classes.Loginbox}>
          <form onSubmit={handleSubmit} className={classes.form_container}>
            <div className={classes.Email_password}>
              <span>Email:</span>
              <input
                ref={emailDOM}
                type="text"
                placeholder="Email Address"
              />
            </div>
            <br />
            <div>
              <span>Password:</span>
              <input
                ref={passwordDOM}
                type="password"  
                placeholder="Password"
              />
            </div>
            <br />
            <button type="submit">Login</button>
          </form>
          <br />
        </div>
      </div>
      <div className={classes.about}>
        <h2>About</h2>
        <h1>Evangadi Forum</h1>
        <br />
        <h4>This website is dedicated to be used as a platform where students at Evangadi school can learn from each other
          by asking and answering questions. This will enable them to learn from each other and will let students have a common understanding
          about the subject they are learning.
          <br />
          <br />
          Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
        </h4>
        <br />
        <button className={classes.second_button}>CREATE A NEW ACCOUNT</button>
      </div> 
    </div>
    </>
  
  )
}

export default Login;