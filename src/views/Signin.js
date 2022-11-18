import {useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../styles/dashboard.css';

// MUI
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
// TODO: implement password visibility toggle
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const api_url = "http://localhost:8080/"

const Signin = ({user, setUser}) => {
    const [formValues, setFormValues] = useState({
        email: null,
        password: null
    })

    const [message, setMessage] = useState(null)

    const setLocalStorage = (data) => {
        localStorage.setItem('moodryUser', JSON.stringify(data));
        setUser(data)
    }

    const handleChange = e => {
        console.log(e.currentTarget);
        const attName = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormValues({...formValues, [attName]: value})
    }

    const handleLogin = () => {
        if (formValues.email && formValues.password){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            };
            try {
            fetch(`${api_url}api/auth/signin`, requestOptions)
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                    res.id ? setLocalStorage(res) : setMessage(res.message)
                })
            }catch (err) {
                setMessage(err.message)
            }
        }
        else {
            setMessage("One or more values is missing, please fill in all values and try again.")
        }
    }
    
    if (user) {
        return <Navigate to="/" replace />;
    }
    

  return (
    <main>
        <div className="form-container">
            <h1>Sign In</h1>
        <TextField
        onChange={handleChange}
        value={formValues.email}
        label={"Enter Email"}
        name="email" 
        />
        <TextField
            onChange={handleChange}
            type='password'
            value={formValues.password}
            label={"Enter Password"} 
            name="password"
        />
            <Button variant="contained" onClick={handleLogin}> Sign In</Button>
       <div> Don't have an account? <Link to="/signup">Sign Up</Link></div>
       <div className="error-message">{message}</div>
        </div>
    </main>
  );
}

export default Signin;
