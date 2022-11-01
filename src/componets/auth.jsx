import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signInImage from '../assets/signup.jpg';

const cookies = new Cookies(); 
    
const initialState = {
	fullName: '',
	userName: '',
	password: '',
	confirmPassword: '',
	phoneNumber: '',
	avatarURL: '',
}

const Auth = ({ very, setVery}) => {
	const [form, setForm] = useState(initialState);
	const [isSingup, setIsSingup] = useState(true);
	const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value});
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
    
    const { fullName, username, password, phoneNumber, avatarURL } = form;

    const URL = 'http://localhost:5000/auth';

    const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSingup ? 'signup' : 'login'}`, {
      username, password, fullName: form.fullName, phoneNumber, avatarURL
    });

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if(isSingup){
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword)
    }
    
    console.log(cookies.get('token'));
    
    setVery(cookies.get('token') ? true : false);
    
    console.log(very);

	}
  
  console.log(isSingup);


	const switchMode = () => {
		setIsSingup((prevIsSingup)=> !prevIsSingup)
	}
	return(
      <div className="auth__form-container">
        <div className="auth__form-container_fields">
          <div className="auth__form-container_fields-content">
            <p>{ isSingup ? 'Sing Up' : 'Sing In'}</p>
            <form onSubmit={handleSubmit}>
            	{isSingup && (
                  <div className="auth__form-container_fields-content_input">
                  	<label htmlFor="fullName">Full Name</label>
                  	<input
                  	  name="fullName"
                  	  type="text"
                  	  placeholder="Full Name"
                  	  onChange={handleChange}
                  	  required
                  	/>
                  </div>
            	)}
            	<div className="auth__form-container_fields-content_input">
                  	<label htmlFor="userName">Username</label>
                  	<input
                  	  name="username"
                  	  type="text"
                  	  placeholder="User Name"
                  	  onChange={handleChange}
                  	  required
                  	/>
                  </div>
                  {isSingup && (
                  <div className="auth__form-container_fields-content_input">
                  	<label htmlFor="phoneNumber">Phone Number</label>
                  	<input
                  	  name="phoneNumber"
                  	  type="text"
                  	  placeholder="Phone Number"
                  	  onChange={handleChange}
                  	  required
                  	/>
                  </div>
            	)}
                {isSingup && (
                  <div className="auth__form-container_fields-content_input">
                  	<label htmlFor="avatarURL">Avatar URL</label>
                  	<input
                  	  name="avatarURL"
                  	  type="text"
                  	  placeholder="Avatar URL"
                  	  onChange={handleChange}
                  	  required
                  	/>
                  </div>
            	)}
            	  <div className="auth__form-container_fields-content_input">
                  	<label htmlFor="password">Password</label>
                  	<input
                  	  name="password"
                  	  type="password"
                  	  placeholder="Pasword"
                  	  onChange={handleChange}
                  	  required
                  	/>
                  </div>
                  {isSingup && (
                  <div className="auth__form-container_fields-content_input">
                  	<label htmlFor="confirmPassword">Confirm Password</label>
                  	<input
                  	  name="consfirmPassword"
                  	  type="password"
                  	  placeholder="Confirm password"
                  	  onChange={handleChange}
                  	  required
                  	/>
                  </div>
            	)}
            	<div className="auth__form-container_fields-content_button">
                  <button>{isSingup ? 'Sing Up' : 'Sing In'}</button>
            	</div>  
            </form>
                <div className="auth__form-container_fields-acccount">
            		<p>
            			{setIsSingup
            				? "Alredy have an account "
            				: "Don't have an account "
            			}
            			<span onClick={switchMode} style={{cursor:'pointer'}}>
            				{isSingup ? 'Sing In' : 'Sing Up'}
            			</span>
            		</p>
            	</div>
          </div>
        </div>
        <div>
        	<img src={signInImage} alt="sing in" width="800"/ >
        </div>
      </div>
	)
}

export default Auth;