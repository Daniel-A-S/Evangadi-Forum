import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';  
import Register from './pages/Register/Register';
import Questions from './pages/Questions/Questions';
import Answers from './pages/Answers/Answers';
import Layout from "./component/Layout/Layout";
import { createContext, useState, useEffect } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';


export const appState = createContext();

function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get('/users/check', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate('/login');
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <appState.Provider value={{ user, setUser }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/answers" element={<Answers />} />
        </Routes>
      </Layout>
    </appState.Provider>
  );
}

export default App;