import {useEffect, useState} from 'react';
import MoodryLogo from './components/logo.svg'
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Material components
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

// App pages
import Dashboard from './views/Dashboard';
import Signup from './views/Signup'
import Signin from './views/Signin'
import Analytics from './views/Analytics'
import ErrorPage from './views/ErrorPage'

// Layout components
import Header from './components/Header'

import { errorMessages } from './constants'

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showCodeField, setShowCodeField] = useState(false);

  const renderError = (error) => {
    return Object.keys(error).map((key, index) => {
      return (
        <li key={index}>
          <h2>
            {key}: {error[key]}
          </h2>

          <hr />
        </li>
      );
    })
  }

  useEffect(() => {
    setUser(localStorage.getItem('moodryUser'), console.log(user?.username));
  },[user])

  // TODO: render conditional routing based on logged in or not

  return (

    <BrowserRouter>
    <div>
      {user &&  <Header user={user} setUser={setUser} />}
      <Routes>
      <Route path="/" element={<Dashboard user={user}/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin setUser={setUser} user={user} />} />
      <Route path="/dashboard" element={<Dashboard user={user}/>} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="*" element={<ErrorPage />} />
      </Routes>
    
    </div>
  </BrowserRouter>
    
  );
}

export default App;
