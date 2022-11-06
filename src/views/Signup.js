import {useState} from 'react';
import { Link } from 'react-router-dom';

import '../styles/dashboard.css';

// MUI
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

// TODO: add visibility toggle to password
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const api_url = "http://localhost:8080/"

const Signup = ({setUser}) => {
    const [formValues, setFormValues] = useState({
        username: null,
        email: null,
        password: null
    })

    const [message, setMessage] = useState(null)

    const handleChange = e => {
        console.log(e.currentTarget);
        const attName = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormValues({...formValues, [attName]: value}, console.log(JSON.stringify(formValues)))
    }

    const signUp = () => {
        if (formValues.username && formValues.email && formValues.password){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            };
            fetch(`${api_url}api/auth/signup`, requestOptions)
                .then(response => response.json())
                .then(res => setMessage(res.message));
        }
        else {
            setMessage("One or more values is missing, please fill in all values and try again.")
        }
    };

  return (
    <main>
        <div className="form-container">
            <h1>Sign Up</h1>
        <TextField
            required
            onChange={handleChange}
            value={formValues.username}
            label={"Enter a Username"}
            name="username" 
        />
        <TextField
        required
        onChange={handleChange}
        value={formValues.email}
        label={"Enter an Email"}
        name="email" 
        />
        <TextField
            required
            onChange={handleChange}
            type='password'
            value={formValues.password}
            label={"Enter a Password"}
            name="password" 
        />
        <Button variant="contained" onClick={() => signUp(formValues.username, formValues.email, formValues.password)} > Sign Up </Button>
            {/*showCodeField && (
            <>
            <span> A code has been sent to your email. Please enter it here. (Don't navigate away from this page yet!)</span>
            <TextField
            onChange={onCodeChange}
            value={codeValue}
            label={"Enter Code"}
        />
            <Button onClick={() => confirmSignup(email, codeValue)} > Confirm Sign Up </Button>
            </>
            )*/}
        <div> Already have an account? <Link to="/signin">Sign In</Link></div>
        </div>
        <div className="form-container error-message">{message}</div>
    </main>
  );
}

export default Signup;
