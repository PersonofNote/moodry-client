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

const Signin = ({handleLogin, user}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // TODO: implement error handling forEach in textFields
    const [error, setError] = useState(null)

    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

    if (user) {
        return <Navigate to="/" replace />;
    }

  return (
    <main>
        <div className="form-container">
            <h1>Sign In</h1>
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
            <Button variant="contained" onClick={handleLogin}> Sign In</Button>
       <div> Don't have an account? <Link to="/signup">Sign Up</Link></div>
        </div>
    </main>
  );
}

export default Signin;
