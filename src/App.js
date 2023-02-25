import {useEffect, useState} from 'react';
import MoodryLogo from './components/logo.svg'
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Material components and theme
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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

// TODO: improve this a LOT
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#242936',
      secondary: '#712B75',
      error: '#000',
      contrastText: '#fff',
      dark: '#242936',
    },
    neutral: {
      main: '#41B4B4',
      contrastText: '#fff',
    },
    custom: {
      main: '#242936',
      dark: '#712B75'
    }
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showCodeField, setShowCodeField] = useState(false);


// TODO: Is this the best way to do this?
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('moodryUser')));
  },[])

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box>
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
  </ThemeProvider>
  );
}

export default App;
