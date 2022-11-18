import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

// MUI
import { Button, Box, TextField } from '@mui/material';

const api_url = 'http://localhost:8080/'

const Profile = ({user}) => {
  const [editPasswordMode, setEditPasswordMode] = useState (false);
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: null,
    newPassword: null
  })

  const [message, setMessage] = useState(null)

  // TODO: Implement hook you wrote for work where you update the status when clicked outside element

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const handleChange = e => {
    const attName = e.currentTarget.name;
    const value = e.currentTarget.value;
    setPasswordValues({...passwordValues, [attName]: value}, console.log(passwordValues))
}

const handleSubmit = () => {
  const formValues = {...passwordValues, user_id: user.id}
  console.log(formValues)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
  };
    try {
    fetch(`${api_url}api/auth/update-password`, requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            setMessage(res.msg)
            // res.id ? setLocalStorage(res) : setMessage(res.message)
        })
    }catch (err) {
        setMessage(err.message)
    }
  }

  return (
    <Box>
        <h2>
          Hello, {user.username}
        </h2>
        {message}
        {editPasswordMode && (
      <form>
          <TextField
            onChange={handleChange}
            type='password'
            value={passwordValues.oldPassword}
            label={"Enter Old Password"} 
            name="oldPassword"
          />
          <TextField
            onChange={handleChange}
            type='password'
            value={passwordValues.newPassword}
            label={"Enter New Password"} 
            name="newPassword"
          />
          <Button onClick={handleSubmit}> Submit</Button>
      </form>
    )}
      <Button onClick={() => setEditPasswordMode(!editPasswordMode)}>{editPasswordMode ? "Cancel" : "Change password"}</Button>
        <hr />
        <h3>Next up:</h3>
        <ul>
          <li>Email reset (with verification)</li>
          <li>Username change</li>
          <li>Subscription management/payments</li>
        </ul>
    </Box>
  );
};

export default Profile;