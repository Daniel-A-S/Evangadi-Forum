import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "../../axiosConfig";
import Button from '@mui/material/Button'; 
import classes from './Answers.module.css'; 


const Answers = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState([]);
  const answerRef = useRef(null);
  const titleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();

  // Function to fetch answers from the server
  const fetchAnswers = async () => {
    try {
      const response = await axios.get(`/answers/${id}`);
      setAnswers(response.data);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    const answerValue = answerRef.current.value.trim();
    const titleValue = titleRef.current.value.trim();

    if (!answerValue || !titleValue) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post('/answers', {
        answer: answerValue,
        title: titleValue,
        questionId: id, // Assuming you need to send the question ID
      });
      alert('Answer posted successfully');
      navigate('/');
      fetchAnswers(); // Optionally refetch answers after submission
    } catch (error) {
      alert(error?.response?.data?.message || 'An error occurred while posting the answer');
    }
  };

  // Fetch answers when component mounts
  useEffect(() => {
    fetchAnswers();
  }, [id]); // Dependency on `id` to refetch if `id` changes

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section className={classes.answer_wrapper}>
      <h1>Would you like to answer a question?</h1>
      <div className={classes.Button_container}>
        <Button onClick={toggleVisibility} variant="contained" color="primary">
          {isVisible ? 'Hide Form' : 'Show Form'}
        </Button>
      </div>

      {isVisible && (
        <form onSubmit={handleAnswer}>
          <div>
            <input
              className={classes.titlebox}
              ref={titleRef}
              placeholder="Type your title here"
            />
          </div>
          <div>
            <textarea
              ref={answerRef}
              className={classes.descriptionbox}
              placeholder="Type your answer here"
            />
          </div>
          <div className={classes.submit_container}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      )}

      {/* Display previously posted answers */}
      <DisplayAnswers answers={answers} />
    </section>
  );
};

// DisplayAnswers Component
const DisplayAnswers = ({ answers }) => {
  return (
    <div>
      <h3>Previously Posted Answers:</h3>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>
            <strong>{answer.title}</strong>
            <p>{answer.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Answers;