import {useEffect, useState, Children} from 'react';
import { Amplify, Auth} from 'aws-amplify';
import '../styles/dashboard.css';

// MUI
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Signup({signUp, switchView, confirmSignup, showCodeField}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codeValue, setCodeValue] = useState("");

    // TODO: implement error handling forEach in textFields
    const [error, setError] = useState(null)

    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);
    const onCodeChange = e => setCodeValue(e.target.value);

  return (
    <main>
        <div className="form-container">
            <h1>Sign Up</h1>
        <TextField
        onChange={onEmailChange}
        value={email}
        label={"Enter Email"} 
        />
        <TextField
            error={error}
            onChange={onPasswordChange}
            type='password'
            value={password}
            label={"Enter Password"} 
        />
            {!showCodeField &&
            <Button onClick={() => signUp(email, password)} > Sign Up </Button>
            }
            {showCodeField && (
            <>
            <span> A code has been sent to your email. Please enter it here. (Don't navigate away from this page yet!)</span>
            <TextField
            onChange={onCodeChange}
            value={codeValue}
            label={"Enter Code"} //optional
        />
            <Button onClick={() => confirmSignup(email, codeValue)} > Confirm Sign Up </Button>
            </>
            )}
        <Button value="signin" onClick={switchView}> Sign In </Button>
        </div>
    </main>
  );
}

export default Signup;
