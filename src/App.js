import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import './App.css';
// AWS stuff
import { Amplify, Auth, Hub, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { DataStore } from '@aws-amplify/datastore';
import { Users } from './models';


// Material components
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

// App components
import Dashboard from './views/Dashboard';
import SigninView from './views/Dashboard'

import { errorMessages } from './constants'

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showCodeField, setShowCodeField] = useState(false);
  const [view, setView] = useState('signup')
  const [codeValue, setCodeValue] = useState("");

  const onTextChange = (e) => setCodeValue(e.target.value);
  // const handleSubmit = () => console.log(codeValue);

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

  const switchView = e => {
    console.log(e.currentTarget.value)
 }
  
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
      setShowCodeField(true)
  } catch (error) {
      console.log('error signing up:', error);
      setError(errorMessages[error.name])
  }
  }

  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code);
      setError({"Success": "Sign up confirmed"})
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
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
        >
        {user && <Button onClick={() => Auth.signOut()}>Sign Out</Button>}
        </nav>
      </header>
      <div>
        
      {user ? (
        <Dashboard user={user} />
      ) : (
        <>
        <Button onClick={() => signIn("jessicaleetaylormartin@gmail.com", "Test@12345")} > Sign In </Button>
        <Button onClick={() => signUp("jessicaleetaylormartin@gmail.com", "Test@12345")} > Sign Up </Button>
        {showCodeField && (
          <>
        <TextField
        onChange={onTextChange}
        value={codeValue}
        label={"Enter Code"} //optional
      />
        <Button onClick={() => confirmSignUp("jessicaleetaylormartin@gmail.com", codeValue)} > Confirm Sign Up </Button>
        </>
        )}
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
