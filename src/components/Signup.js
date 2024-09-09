import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth,db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';
import { FaEnvelope,  FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, 'Users', user.uid),{
          email: user.email,
          firstname: fname,
          lastname: lname,
      
        })
      }
      console.log('user registered successfully');
     
    } catch (error) {
      console.log(error.message);
      
    }
  };

  return (
    <div className='wrapper'>
    <form onSubmit={handleSignUp}>
      <h3>Sign Up</h3>
      <div className='input-box'>
        <input type='fname' placeholder='Enter fisrtname' id='fname' autoComplete='off' value={fname} onChange={(e) => setFname(e.target.value)} />
        <FaUser className='icon'/>
        </div>

        <div className='input-box'>
          <input type='lname' placeholder='Enter lastname' id='lname' autoComplete='off' value={lname} onChange={(e) => setLname(e.target.value)} />
          <FaUser className='icon'/>
        </div>

       <div className='input-box'>
          <input type='email' placeholder='Enter email' id='email' autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} />
          <FaEnvelope className='icon'/>
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Enter password' autoComplete='off' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <FaLock className='icon'/>
      </div>
      <button type="submit" class="btn btn-secondary">Sign Up</button>
    </form>
    <div className='signin'>
      <p>Already have an account ?</p>
      <Link to='/signin' type="submit" class="btn btn-secondary btn-signin">Sign In</Link>
    </div>
    </div>
  )
}

export default Signup;