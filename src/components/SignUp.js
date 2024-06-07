import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('https://vocabsathi.pythonanywhere.com/api/register/', formData)
//       .then(res => {
//         console.log(res.data);
//         navigate('/signin');
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };
//   return (
//     <div className='container' style={{paddingTop: '70px'}}>
//         <div className='row'>
//             <div className='col-12'>
//                 <div className='card my-3'>
//                     <div className='card-header' style={{ backgroundColor: 'rgb(239 255 238)' }}>
//                         <h3 className='my-2'>SignUp</h3>
//                     </div>
//                     <div className='card-body'>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group my-3">
//                             <label htmlFor="exampleUserName">Username</label>
//                             <input type="email" className="form-control" id="username" name="username" onChange={handleChange} value={formData.username} placeholder="Enter Username" />
//                         </div>
//                         <div className="form-group my-3">
//                             <label htmlFor="exampleInputEmail1">Email address</label>
//                             <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} aria-describedby="emailHelp" placeholder="Enter email" />
//                             <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                         </div>
//                         <div className="form-group my-3">
//                             <label htmlFor="exampleInputPassword1">Password</label>
//                             <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" />
//                         </div>
//                         <span>Already have an account ? <Link to="/signin">SignIn here</Link></span>
//                         <button type="submit" className="btn btn-success my-2 w-100 py-2">Register</button>
//                     </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Signup;


// import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
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

export default function SignUp() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://vocabsathi.pythonanywhere.com/api/register/', formData)
      .then(res => {
        console.log(res.data);
        setAlert({ type: 'success', message: 'You have registered successfully.' });
        setTimeout(() => {
            navigate('/signin');
        }, 5000);
      })
      .catch(err => {
        console.error(err);
        setAlert({ type: 'error', message: err.message });
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={handleChange}
                  value={formData.username}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-center">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {alert && (
                <Grid item xs={12}>
                    <Alert severity={alert.type}>{alert.message}</Alert>
                </Grid>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
