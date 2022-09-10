import {useEffect, useState} from 'react';
import MoodryLogo from './components/logo.svg'
import './App.css';
// AWS stuff
import { Amplify, Auth, Hub, API, graphqlOperation } from 'aws-amplify';
// import awsconfig from './aws-exports';
import { DataStore } from '@aws-amplify/datastore';
import { Users } from './models';


// Material components
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

// App components
import Dashboard from './views/Dashboard';
import Signup from './views/Signup'
import Signin from './views/Signin'

import { errorMessages } from './constants'

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showCodeField, setShowCodeField] = useState(false);
  const [view, setView] = useState('signup')

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

  // Consider refactor, as this just switches between login and signup. Break out?
  const switchView = e => {
    setView(e.target.value)
 }
  
 // Straight from https://docs.amplify.aws/lib/auth/auth-events/q/platform/js/
 // Not sure I 100% understand exactly what's going on here with 'congnitoHostedUI'
 // The code works but I see some redundancies
 useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          setError(data)
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);
  

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  const signUp = async (username, password) => {
    try {
      const { user } = await Auth.signUp({ username, password });
      // second stage of signup; check if Amplify has a pre-rolled solution to this
      setShowCodeField(true)
  } catch (error) {
      console.log('error signing up:', error);
      setError(errorMessages[error.name])
  }
  }

  const confirmSignup = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
      setError("Success! You can now log in")
    } catch (error) {
        console.log('error confirming sign up', error);
        setError(errorMessages[error.name])
    }
}

  const signIn = async (username, password) => {
    try {
    const user = await Auth.signIn(username, password);
} catch (error) {
    console.log('error signing in', error);
    setError(errorMessages[error.name])
}
  }


  const signOut = async () => {
    try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
  }

  return (
    
    <div className="App">
      <header className="App-header">
      <nav>
        <img className='logo-icon' src={MoodryLogo} alt="Moodry Logo" />
        {user && <Button onClick={() => Auth.signOut()}>Sign Out</Button>}
        </nav>
      </header>
      <div>
        
      {user ? (
        <Dashboard user={user} />
      ) : (
        <>
        {view === 'signup' ? <Signup signUp={signUp} showCodeField={showCodeField} confirmSignup={confirmSignup} switchView={switchView} /> : <Signin signIn={signIn} switchView={switchView} />}
        
        </>
      )}
      {error && (
        <div>{error}</div>
      )}
    </div>
    </div>
  );
}

export default App;
