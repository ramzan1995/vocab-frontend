import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    axios.post('https://vocabsathi.pythonanywhere.com//api/token/', formData)
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
    <div className='container' style={{paddingTop: '70px'}}>
        <div className='row'>
            <div className='col-12'>
                <div className='card my-3'>
                    <div className='card-header' style={{ backgroundColor: 'rgb(239 255 238)' }}>
                        <h3 className='my-2'>SignIn</h3>
                    </div>
                    <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="exampleUserName">Username</label>
                            <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-success my-3 py-2 w-100">SignIn</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin;