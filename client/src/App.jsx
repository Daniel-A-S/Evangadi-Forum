import React, { createContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';  
import Register from './pages/Register/Register';
import Questions from './pages/Questions/Questions';
import Answers from './pages/Answers/Answers';
import Layout from "./component/Layout/Layout";
import axios from './axiosConfig';
import { UserProvider } from './UserContext'; // Import your UserContext

export const appState = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [Loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function checkUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return navigate('/login');
    }
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
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserProvider> 
      <appState.Provider value={{ user, setUser }}>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/answers" element={<Answers />} />
          </Routes>
        </Layout>
      </appState.Provider>
    </UserProvider>
  );
}

export default App;