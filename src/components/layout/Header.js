import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
   <header className='header'>
    <Link to='' className='logo'>Treasure Secure Currency</Link>
    <nav className='navbar'> 
      <Link to='/'>Home</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/wallet'>Wallet</Link>
      <Link to='/contact'>Contact</Link> 
    </nav>
   </header>
  )
}

export default Header;