import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import { StatusCodes } from 'http-status-codes';
import Button from '@mui/material/Button';
import classes from './Questions.module.css';
import { useUser } from '../../UserContext'; // Import UserContext

function Questions() {
  const navigate = useNavigate();
  const title = useRef(null);
  const description = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const userContext = useUser(); // Get user context
  const userId = userContext.user ? userContext.user.userid : null; // Extract user ID

  // Function to fetch questions from the server
  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/questions');
      setQuestions(response.data); 
    } catch (error) {
      console.error('Error fetching questions:', error.response ? error.response.data : error.message);
    }
  };

  // Fetch questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }, []); 

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = title.current.value.trim();
    const descriptionValue = description.current.value.trim();
    
    // Logging the userId and token for debugging
    console.log("User ID:", userId);
    const token = localStorage.getItem('token');
    console.log("Token from local storage:", token);

    if (!titleValue || !descriptionValue) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const { data } = await axios.post('/questions', {
        userid: userId,  // Include userid here
        title: titleValue,
        description: descriptionValue,
      });
      alert(`Question posted successfully. Check back later for answers.`);
      navigate('/');
      fetchQuestions(); 
    } catch (error) {
      console.error("Error posting question:", error.response ? error.response.data : error.message);
      alert("Failed to post question. Please try again later.");
    }
  }

  return (
    <section className={classes.question_wrapper}>
      <div>
        <h1>Any Question? Post it Here</h1>
        <br />
        <Link to='/answers' className={classes.questionlink}>Go to Questions and Answers Page</Link>
        <br />
        <h4 className={classes.Steps}> Steps to ask a good question</h4>
        <br />
        <br />
        <ul>
          <li>Summarize your problem in one-line title</li>
          <li>Describe your problem in more detail</li>
          <li>Describe what you tried and what you expected to happen</li>
          <li>Review your question and post it to the site</li>
        </ul>
        <br />
        <br />
        <div className={classes.Button_container}>
          <Button onClick={toggleVisibility} variant="contained" color="primary">
            {isVisible ? 'Hide Question Form' : 'Show Question Form'}
          </Button>
        </div>
        <br />
        <br />
      </div>
      {isVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className={classes.titlebox}
              ref={title}
              placeholder="Type your title here"
            />
          </div>
          <div>
            <textarea
              ref={description}
              className={classes.descriptionbox}
              placeholder="Type your question here"
            />
          </div>
          <div className={classes.submit_container}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

export default Questions;