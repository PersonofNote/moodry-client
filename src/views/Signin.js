import {useState} from 'react';
import '../styles/dashboard.css';

// MUI
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
// TODO: implement password visibility toggle
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Signin({signIn, switchView}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // TODO: implement error handling forEach in textFields
    const [error, setError] = useState(null)

    const onEmailChange = e => setEmail(e.target.value);
    const onPasswordChange = e => setPassword(e.target.value);

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
            <Button variant="contained" onClick={() => signIn(email, password)}> Sign In</Button>
        <Button value="signup" onClick={switchView}> Sign Up </Button>
        </div>
    </main>
  );
}

export default Signin;
