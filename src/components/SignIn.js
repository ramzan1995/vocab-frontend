import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://ramzan1995.github.io/vocab-frontend">
        Vocabसाथी
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://vocabsathi.pythonanywhere.com/api/token/', formData)
      .then(res => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        navigate('/home');
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" style={{ marginTop: '150px'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    // <div className='container' style={{paddingTop: '70px'}}>
    //     <div className='row'>
    //         <div className='col-12'>
    //             <div className='card my-3'>
    //                 <div className='card-header' style={{ backgroundColor: 'rgb(239 255 238)' }}>
    //                     <h3 className='my-2'>SignIn</h3>
    //                 </div>
    //                 <div className='card-body'>
    //                 <form onSubmit={handleSubmit}>
    //                     <div className="form-group my-3">
    //                         <label htmlFor="exampleUserName">Username</label>
    //                         <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" />
    //                     </div>
    //                     <div className="form-group my-3">
    //                         <label htmlFor="exampleInputPassword1">Password</label>
    //                         <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
    //                     </div>
    //                     <span>Don't have an account ? <Link to="/siugnp">Signup here</Link></span>
    //                     <button type="submit" className="btn btn-success my-3 py-2 w-100">SignIn</button>
    //                 </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  )
}

export default Signin;