import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { FaEnvelope,  FaLock } from 'react-icons/fa';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully');
      navigate('/profile');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('User does not exist. Please sign up.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email format. Please enter a valid email.');
      } else {
        setErrorMessage('Failed to sign in. Please sign up.');
      }
      console.log(error.message);
    }
  };
  return (
    <div className='wrapper'>
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      {errorMessage && <p className="error">{errorMessage}</p>}
       <div className='input-box'>
          <input type='email' placeholder='Enter email' id='email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
          <FaEnvelope className='icon'/>
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Enter password' autoComplete='off' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon'/>
      </div>
      <button type="submit" class="btn btn-secondary">Sign In</button>
    </form>
    <div className='signin'>
      <p>Don't have an account ?</p>
      <Link to='/signup' type="submit" class="btn btn-secondary btn-signin">Sign Up</Link>
    </div>
    </div>
  )
}

export default Signin;


