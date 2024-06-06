import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
    axios.post('https://vocabsathi.pythonanywhere.com/api/register/', formData)
      .then(res => {
        console.log(res.data);
        navigate('/signin');
      })
      .catch(err => {
        console.error(err);
      });
  };
  return (
    <div className='container' style={{paddingTop: '70px'}}>
        <div className='row'>
            <div className='col-12'>
                <div className='card my-3'>
                    <div className='card-header' style={{ backgroundColor: 'rgb(239 255 238)' }}>
                        <h3 className='my-2'>SignUp</h3>
                    </div>
                    <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="exampleUserName">Username</label>
                            <input type="email" className="form-control" id="username" name="username" onChange={handleChange} value={formData.username} placeholder="Enter Username" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="email" name="email" onChange={handleChange} value={formData.email} aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-success my-2 w-100 py-2">Register</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup;
