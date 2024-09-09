import { useEffect, useState } from 'react';
import './App.css';

import NotFound from './components/NotFound';
import Profile from './components/Profile';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import { BrowserRouter as Router, Routes, Route, Navigate,  } from'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { auth } from './components/firebase';
import Header from './components/layout/Header';
import Wallet from './components/Wallet';
import Contact from './components/Contact';
function App() {
  const [user, setUser] = useState();

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  },[])
  return (
   
    <Router>
       <Header/>
      <div className='App'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route exact path='/' element={user ? <Navigate to='/profile'/>:<SignIn />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/wallet' element={<Wallet />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <ToastContainer/>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
