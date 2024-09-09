import React, { useState } from 'react'
import './Wallet.css';
import { Link } from 'react-router-dom';
const Wallet = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleTextClick = () => {
    setIsVisible(!isVisible);  // Toggle the visibility state on click
  };
  return (
    <div className='wallet-info'> 
      <div className="card text-center">
        <div className="card-header">Wallet</div>
          <div className="card-body">
            <h5 className="card-title">User Wallet Info</h5>
              <p className="card-text">
                <p>Public key: H2a5hSxBIsPJJJfKHeLVlUC5zRHCFkPBsX6mM9UCDPrwdD5X5qE2Y57YJX9TJjZi</p>
                  <p  className={`blur-text ${isVisible ? 'visible' : ''}`}  // Add 'visible' class when clicked
                      onClick={handleTextClick}>Private key: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhwnOvF0dUrDppK5leXLP
                        h7I/0J5GjXJZM5SlqUwXjN+1mQgajhLzmDZR0eGw6YKQRuCS5IeWo5L+16HQnKvZ
                        rXjJEw2mP5K8QPRAc5Q6o04dR3QN8DnADel3Zi934kHpWU5dKHtMk684TCDFtb/H
                        EtrcjkOVnVJ7JFeK25iC/Y5Yq/e0J/mj6R4ksIEQVohxo/76zpOcSk8IqS/p+R5w
                        i1st9klGNY/SgDlhu30Q6YTxJViD3UaSTYBKcsPW/Ye5jNfAW9z2RiN3QERJ+nwx
                        P/XC/9sJPuq91mxzbQ4X8B0KGFUxG02HRsfXTKNsdcLvfz9y85QAKZLXEs5pJmK0
                        LwIDAQAB
                  </p>
                </p>
              <Link to='/contact' className="btn btn-primary">Setup wallet account contact</Link>
          </div>
        </div>
      </div>
  )
}

export default Wallet;