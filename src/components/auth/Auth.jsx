import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import api from '../../api/axiosConfig';

import { Link } from 'react-router-dom';
import { FaFacebookF, FaGithub, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";

import { ToastClassName, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function Auth({ setLoggedIn }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const activeRegister = () => {
    setIsActive(true);
  }
  const activeLogin = async() => {
    setIsActive(false);
  }

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateUserInf = () => {
    if(userName.trim().length < 1){
      toast.warning("Tên người dùng không được để trống!", {
        icon: "⚠️"
      });
      setUserName("");
      return;
    }
    
    let regexEmail = new RegExp("^[0-9a-zA-Z]+\\w+@\\w+(\\.\\w+)*(\\.[a-zA-Z]{2,6})$");
    if(!regexEmail.test(email)){
      toast.warning("Email không đúng định dạng!", {
        icon: "⚠️"
      });      
      return;
    }

    if(password.trim().length < 8){
      toast.warning("Mật khẩu phải có ít nhất 8 ký tự!", {
        icon: "⚠️"
      });
      return;
    }
    return true;
  }

  const registerUser = async() => {
    if(validateUserInf()) {
      let response = await api.post("/api/v1/auth/register", {username: userName, email: email, password: password});
      if(response.data.status==201){
        setUserName("");
        setEmail("");
        setPassword("");
        toast.success("Đăng ký thành công!", {
          icon: "✅"
        });
        setIsActive(true);
      } else if(response.data.status==400) {
        if(response.data.message=="Email already exists!") {
          toast.warning("Email đã được đăng ký trước đó!", {
            icon: "⚠️"
          });
        } else if(response.data.message=="Username already exists!") {
          toast.warning("Username đã được đăng ký trước đó!", {
            icon: "⚠️"
          });
        }
      }
    }
  }

  const login = async () => {

    if(userName.trim().length < 1){
      toast.warning("Tên đăng nhập không được để trống!", {
        icon: "⚠️"
      });
      setUserName("");
      return;
    }

    if(password.trim().length < 1){
      toast.warning("Mật khẩu không được để trống", {
        icon: "⚠️"
      });
      return;
    }

    try {
      const response = await api.post('/api/v1/auth/login', {
        userName,
        password
      }, { withCredentials: true });

      if(response.data.success == true) {
        // Lưu token vào cookies sau khi đăng nhập thành công
        Cookies.set('token', response.data.data.accessToken, { secure: true, sameSite: 'strict' });
        Cookies.set('refreshToken', response.data.data.refreshToken, { secure: true, sameSite: 'strict' });

        setLoggedIn(true);
        navigate('/schedule'); // Chuyển hướng về trang chủ sau khi đăng nhập
      } else {
        toast.warning("Thông tin đăng nhập không chính xác", {
          icon: "⚠️"
        });
      }
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className='auth'>
      <ToastContainer 
        icon={true} 
      />
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
              <input type="text" autoComplete="section-blue shipping name" value={userName} onInput={e => setUserName(e.target.value)} id="registerUserName" placeholder='Tên người dùng'/>
              <input type="email" autoComplete="section-blue shipping email" value={email} onInput={e => setEmail(e.target.value)} id="registerEmail" placeholder='email'/>
              <input type="password" autoComplete="section-blue shipping new-password" value={password} onInput={e => setPassword(e.target.value)} id="registerPassword" placeholder='Mật khẩu'/>
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
            <input type="text" autoComplete="section-blue shipping name" value={userName} onInput={e => setUserName(e.target.value)} id="loginUsername" placeholder='username' />
            <input type="password" autoComplete="section-blue shipping current-password" value={password} onInput={e => setPassword(e.target.value)} id="loginPassword" placeholder='password'/>
            <Link to={"#"}>Quên mật khẩu?</Link>
            <button type='button' onClick={login}>Đăng nhập</button>
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
