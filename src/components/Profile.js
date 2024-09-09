import React, { useEffect, useState } from 'react';
import { auth,db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const docRef = doc(db, 'Users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('User is not signed in');
        setUserDetails(''); // Clear user details when user is signed out
      }
    });
  };
  

  useEffect(() => {
    fetchUserData();
  },[]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.log('Error signing out',error.message);
    }
  }
  return (
    <div className='profile-info'> 
      <div className="card text-center">
        <div className="card-header">Profile</div>
          <div className="card-body">
            <h5 className="card-title">User Info</h5>
              <p className="card-text">
              {userDetails ? (<> <div>
                <p>Email: {userDetails.email}</p>
                <p>Firstname: {userDetails.firstname}</p>
                <p>Lastname: {userDetails.lastname}</p>
                </div>
  
            </>
          ): (
        <p>Loading...</p>
      )}
              </p>
                <Link to="/wallet" className="btn-wallet-info">View Wallet Info</Link>
                <button className='btn-signout' onClick={handleSignOut}>Sign out</button>
          </div>
        </div>
      </div>
  )
}

export default Profile;