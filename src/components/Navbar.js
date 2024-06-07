import React from "react"
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('access_token') !== null;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#4CAF50' }}>
  <div className="container">
    <Link className="navbar-brand" to="/"><h2><span style={{color: '#fff'}}><b>Vocab</b></span><span style={{color: 'red'}}><b>साथी</b></span></h2></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {auth && (
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/home"><b>Home</b></Link>
        </li>
      )}
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/myvocabs"><b>My Vocabs</b></Link>
        </li>
      </ul>
      <ul className="d-flex navbar-nav mb-2 mb-lg-0">
        {!auth && (
          <>
            <li className="nav-item"><Link className="nav-link" aria-current="page" to="/signup"><b>Signup</b></Link></li>
            <li className="nav-item"><Link className="nav-link" aria-current="page" to="/home"><b>SignIn</b></Link></li>
          </>
        )}
        {auth && (
            <li className="nav-item">
              {/* <button className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
              <Button variant="contained" endIcon={<LogoutIcon />} onClick={handleLogout} color="error">
                Logout
              </Button>
            </li>
        )}
      </ul>
    </div>
  </div>
</nav>
  )
}
