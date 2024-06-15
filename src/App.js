import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import QRCodes from './components/qrcode/QRCode';
import AttendanceCam from './components/accessCamera/AttendanceCam';
import CameraRealTime from './components/accessCamera/realtime/CameraRealTime';
import Home from './components/Home';
import Auth from './components/auth/Auth';

function App() {

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // Check token when access app
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    } else {
      navigate('/auth');
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/auth' element={<Auth setLoggedIn={setLoggedIn}/>}/>
        <Route path='/*' element={<Home setLoggedIn={setLoggedIn}/>}/>
        <Route path='/cam/:id/:token' element={<AttendanceCam/>}/>
        <Route path='/real' element={<CameraRealTime/>}/>
      </Routes>
    </div>
  );
}

export default App;
