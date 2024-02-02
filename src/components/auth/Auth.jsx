import React, { useState } from 'react';
import './Auth.css';
import api from '../../api/axiosConfig';

import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

function Auth() {
  const auth = document.getElementById('auth');
  const [isActive, setIsActive] = useState(false);

  const activeRegister = () => {
    setIsActive(true);
  }
  const activeLogin = () => {
    setIsActive(false);
  }

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lbUserName, setLbUserName] = useState('');
  const [lbEmail, setLbEmail] = useState('');
  const [lbPassword, setLbPassword] = useState('');

  const validateUserInf = () => {
    if(userName.length < 1){
      setLbUserName("Tên người dùng không được để trống!")
      return;
    }
    setLbUserName("");
    
    let regexEmail = new RegExp("^[0-9a-zA-Z]+\\w+@\\w+(\\.\\w+)*(\\.[a-zA-Z]{2,6})$");
    if(!regexEmail.test(email)){
      setLbEmail("Email không đúng định dạng!")
      return;
    }
    setLbEmail("");

    if(password.length < 8){
      setLbPassword("Mật khẩu phải có ít nhất 8 ký tự!")
      return;
    }
    setLbPassword("");
    return true;
  }

  const registerUser = async() => {
    if(validateUserInf()){
      let response = await api.post("/api/v1/auth/register", {userName: userName, email: email, password: password});
      if(response.data.success)
        alert("Thanh cong");
    }
    
  }

  return (
    <div className='auth'>
      <div className={isActive ? 'auth_container active' : 'auth_container'} id='container'>
        <div className='form-container sign-up'>
          <form>
            <h2>Đăng ký</h2>
            <div className='social-icons'>
              <Link to={"#"}><FaGooglePlusG/></Link>
              <Link to={"#"}><FaFacebookF/></Link>
              <Link to={"#"}><FaGithub/></Link>
              <Link to={"#"}><FaLinkedinIn/></Link>
            </div>
            <span>hoặc sử dụng email để đăng ký</span>
            <p>
              <label>{lbUserName}</label>
              <input type="text" autoComplete="section-blue shipping name" value={userName} onInput={e => setUserName(e.target.value)} id="registerUserName" placeholder='username'/>
            </p>
            <p>
              <label>{lbEmail}</label>
              <input type="email" autoComplete="section-blue shipping email" value={email} onInput={e => setEmail(e.target.value)} id="registerEmail" placeholder='email'/>
            </p>
            <p>
              <label>{lbPassword}</label>
              <input type="password" autoComplete="section-blue shipping new-password" value={password} onInput={e => setPassword(e.target.value)} id="registerPassword" placeholder='password'/>
            </p>
            <button type='button' onClick={registerUser}>Đăng ký</button>
          </form>
        </div>
        <div className='form-container sign-in'>
          <form>
            <h1>Đăng nhập</h1>
            <div className='social-icons'>
              <Link to={"#"}><FaGooglePlusG/></Link>
              <Link to={"#"}><FaFacebookF/></Link>
              <Link to={"#"}><FaGithub/></Link>
              <Link to={"#"}><FaLinkedinIn/></Link>
            </div>
            <span>hoặc sử dụng email password</span>
            <input type="text" autoComplete="section-blue shipping name" id="loginUsername" placeholder='username'/>
            <input type="password" autoComplete="section-blue shipping current-password" id="loginPassword" placeholder='password'/>
            <Link to={"#"}>Quên mật khẩu?</Link>
            <button type='submit'>Đăng nhập</button>
          </form>
        </div>
        <div className='toggle-container'>
          <div className='toggle'>
            <div className='toggle-panel toggle-left'>
              <h1>Đăng nhập ngay!</h1>
              <p>Nếu như bạn đã có tài khoản, hãy chuyển sang trang đăng nhập</p>
              <button className="hidden" id="login" onClick={() => activeLogin()}>Đăng nhập</button>
            </div>
            <div className='toggle-panel toggle-right'>
              <h1>Đăng ký ngay!</h1>
              <p>Đăng ký tài khoản để có thể sử dụng tất cả các tính năng của trang web này</p>
              <button className="hidden" id="register" onClick={() => activeRegister()}>Đăng ký</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth;
