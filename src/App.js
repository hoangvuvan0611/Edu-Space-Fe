import './App.css';
import { Routes, Route } from 'react-router-dom';
import QRCodes from './components/qrcode/QRCode';
import AttendanceCam from './components/accessCamera/AttendanceCam';
import CameraRealTime from './components/accessCamera/realtime/CameraRealTime';
import Home from './components/Home';
import Auth from './components/auth/Auth';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/cam/:id/:token' element={<AttendanceCam/>}/>
        <Route path='/real' element={<CameraRealTime/>}/>
      </Routes>
    </div>
  );
}

export default App;
