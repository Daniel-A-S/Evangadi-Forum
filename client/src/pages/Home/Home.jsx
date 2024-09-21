import React, { useState,useEffect } from 'react';
import classes from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';


function Home() {
   const navigate = useNavigate();
   const[questions,setquestions]=useState([]);

   useEffect(() => {
    const fetchQuestions = async () => {
      try{
        const response=await fetch('http://localhost:5000/questions');
        const data=await response.json();
        setquestions(data);
      } catch (error){
        console.log("error fetching questions:",error);
      }
    }
    fetchQuestions();
   })

   async function handleSubmit(e) {
    e.preventDefault();
    navigate('/questions');
   }

  return (
    <>
    <div className={classes.welcome_button}>
     <button onClick ={handleSubmit} className={classes.question_button}>Ask Questions</button>
    </div>
    <div>
    <h1>Questions</h1>
    <ul>
      {questions.map(question=>{
        <li key={question.id}>{question.question}</li>
      })}
    </ul>
    </div>
    </>
  )
}


export default Home;




