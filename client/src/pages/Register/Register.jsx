import React, { useRef } from 'react';
import axios from "../../axiosConfig";
import { Link,useNavigate } from 'react-router-dom';
import classes from "./Register.module.css";



function Register() {
  const navigate = useNavigate();
  const usernameDOM = useRef(null);
  const firstnameDOM = useRef(null);
  const lastnameDOM = useRef(null);
  const emailDOM = useRef(null);
  const passwordDOM = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
  
    const uservalue = usernameDOM.current.value;
    const firstvalue = firstnameDOM.current.value;
    const lastvalue = lastnameDOM.current.value;
    const emailvalue = emailDOM.current.value;
    const passvalue = passwordDOM.current.value;
  
    if (!uservalue || !firstvalue || !lastvalue || !emailvalue || !passvalue) {
      alert("All fields are required");
      return;
    }
  
    try {
      const response = await axios.post('/users/register', {
        username: uservalue,
        firstname: firstvalue,
        lastname: lastvalue,
        email: emailvalue,
        password: passvalue
      });

      alert("User registered successfully");
      navigate('/login');

    } catch (error) {
      // Check for specific errors (if applicable)
      if (error.response) {
        const { status, data } = error.response;
        let errorMessage = "Something went wrong";
        switch (status) {
          
          case 400: // Bad Request
            errorMessage = data.msg || "Invalid user information";
            break;
          case 409: // Conflict (e.g., user already exists)
            errorMessage = data.msg || "User already exists";
            break;
            default:
            // Handle other potential error codes
            break;
        }
        alert(errorMessage);
      } else {
        console.error("Error:", error.message);
        alert("Network error occurred");
      }
    }
  }
  return (
    <div className={classes.Register_container}>
    <div className={classes.Register_wrapper}>
      <div className={classes.text_container}>
        <h4>Join the newtwork</h4>
        <br />
        <div className={classes.toptext}>
        <h4>Alreay Have an account?</h4>  <Link to='/login'> Sign in </Link>
        
        </div>
      </div>
      <br />

      <form onSubmit={handleSubmit}>

        <div className={classes.Register_box}>
          <span></span>
          <input
            ref={usernameDOM}
            type="text"
            placeholder="Username"
          />
        </div>
        <br />
        <div>
          <span></span>
          <input
            ref={firstnameDOM}
            type="text"
            placeholder="First Name"
            className={classes.name_input}
          />
        </div>
        <br />
        <div>
          <span></span>
          <input
            ref={lastnameDOM}
            type="text"
            placeholder="Last Name"
            className={classes.name_input}
          />
        </div>
        <br />
        <div>
          <span></span>
          <input
            ref={emailDOM}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <br />
        <div>
          <span></span>
          <input
            ref={passwordDOM}
            type="password"  
            placeholder="Password"
          />
        </div>
        <br />
        <div className={classes.button_container}>
        <button type="submit">Register</button>
        <Link to="/login">Login</Link>
        </div>
      </form>
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
        <br />
        <br />
      </div> 
    </div>
  
  )
}
export default Register;