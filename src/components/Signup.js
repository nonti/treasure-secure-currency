import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import './SignUp.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // For success modal
  const [errorMessage, setErrorMessage] = useState(''); // To display Firebase errors
  const [validationErrors, setValidationErrors] = useState({}); // To track validation errors

  const validateForm = () => {
    const errors = {};
    if (!fname.trim()) errors.fname = 'First name is required.';
    if (!lname.trim()) errors.lname = 'Last name is required.';
    if (!email.trim()) errors.email = 'Email is required.';
    if (!password.trim()) errors.password = 'Password is required.';
    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset Firebase error message

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Display validation errors if any
      return;
    }

    try {
      // Try to create the user
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstname: fname,
          lastname: lname,
        });
      }

      // Clear the form inputs
      setEmail('');
      setPassword('');
      setFname('');
      setLname('');

      // Reset validation errors
      setValidationErrors({});

      // Show success modal
      setIsRegistered(true);
    } catch (error) {
      // Handle Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already in use. Please sign in or use another email.');
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  // Close modal function
  const closeModal = () => {
    setIsRegistered(false);
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSignUp}>
        <h3>Sign Up</h3>
        {errorMessage && <p className='error'>{errorMessage}</p>} {/* Display Firebase error if exists */}
        
        <div className='input-box'>
          <input
            type='text'
            placeholder='Enter firstname'
            id='fname'
            autoComplete='off'
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <FaUser className='icon' />
          {validationErrors.fname && <p className='error'>{validationErrors.fname}</p>} {/* Display first name validation error */}
        </div>

        <div className='input-box'>
          <input
            type='text'
            placeholder='Enter lastname'
            id='lname'
            autoComplete='off'
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <FaUser className='icon' />
          {validationErrors.lname && <p className='error'>{validationErrors.lname}</p>} {/* Display last name validation error */}
        </div>

        <div className='input-box'>
          <input
            type='email'
            placeholder='Enter email'
            id='email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className='icon' />
          {validationErrors.email && <p className='error'>{validationErrors.email}</p>} {/* Display email validation error */}
        </div>

        <div className='input-box'>
          <input
            type='password'
            placeholder='Enter password'
            autoComplete='off'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
          {validationErrors.password && <p className='error'>{validationErrors.password}</p>} {/* Display password validation error */}
        </div>

        <button type='submit' className='btn btn-secondary'>
          Sign Up
        </button>
      </form>

      <div className='signin'>
        <p>Already have an account?</p>
        <Link to='/signin' className='btn btn-secondary btn-signin'>
          Sign In
        </Link>
      </div>

      {/* Success modal */}
      {isRegistered && (
        <div className={`modal ${isRegistered ? 'show' : ''}`}>
          <div className='modal-content'>
            <h4>Success!</h4>
            <p>User registered successfully.</p>
            <button className='btn btn-secondary' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
