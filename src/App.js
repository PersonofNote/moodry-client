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
import {  Box } from '@mui/material';

// App pages
import Dashboard from './views/Dashboard';
import Signup from './views/Signup'
import Signin from './views/Signin'
import Analytics from './views/Analytics'
import Profile from './views/Profile'
import ErrorPage from './views/ErrorPage'

// Layout components
import Header from './components/Header'
import Loader from './components/Loader'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCodeField, setShowCodeField] = useState(false);

useEffect(() => {
  fetch("https://onh73rsuetfgswo6rvlcdxg6ri0zezss.lambda-url.us-west-2.on.aws/")
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}, [])

// TODO: Is this the best way to do this?
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('moodryUser')), setLoading(false));
  },[])

  if (loading) {
    return <Loader />
  }

  return (
    <Box sx={{maxWidth: '1200px', margin: 'auto'}}>
      <BrowserRouter>
      <div>
        {user &&  <Header user={user} setUser={setUser} />}
          <Routes>
            <Route path="/" element={<Dashboard user={user}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin setUser={setUser} user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user}/>} />
            <Route path="/profile" element={<Profile user={user}/>} />
            <Route path="/analytics" element={<Analytics user={user} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
      </div>
     </BrowserRouter>
  </Box>
  );
}

export default App;
