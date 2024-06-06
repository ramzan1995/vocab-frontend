import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
import VocabTextArea from './components/VocabTextArea';
import Navbar from './components/Navbar';
import MyVocabs from './components/MyVocabs';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<PrivateRoute><VocabTextArea /></PrivateRoute>} />
        <Route path="/myvocabs" element={<PrivateRoute><MyVocabs /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/vocab-frontend" element={<Navigate to="/home" />} />
      </Routes>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem('access_token');
  return auth ? children : <Navigate to="/signin" />;
};

export default App;
