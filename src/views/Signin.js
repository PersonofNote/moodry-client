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

import Loader from '../components/Loader'


const api_url = process.env.NODE_ENV === 'development' ? 'https://xk5wizjyfh.execute-api.us-east-1.amazonaws.com/prod/' : 'https://xk5wizjyfh.execute-api.us-east-1.amazonaws.com/prod/'

const Signin = ({user, setUser}) => {
    const [formValues, setFormValues] = useState({
        email: null,
        password: null
    })
    const [loading, setLoading] = useState(null);
    const [message, setMessage] = useState(null)

    const setLocalStorage = (data) => {
        localStorage.setItem('moodryUser', JSON.stringify(data));
        setUser(data)
    }

    const handleChange = e => {
        const attName = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormValues({...formValues, [attName]: value})
    }

    const handleLogin = () => {
        setLoading(true);
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
                    res.id ? setLocalStorage(res) : setMessage(res.message)
                    setLoading(false);
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
            {loading ? <Loader /> : (
                <>
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
            </>
            )}
       <div className="error-message">{message}</div>
        </div>
    </main>
  );
}

export default Signin;
