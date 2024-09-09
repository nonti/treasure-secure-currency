import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { PiBuildingOfficeBold } from "react-icons/pi";
import './Contact.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import SuccessModal from './SuccessModal'; // Import the Modal

const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    firstname:'',
    lastname:'',
    company:'',
    message:''
  });
  
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        company: contactFormData.company,
        lastname: contactFormData.lastname,
        firstname: contactFormData.firstname,
        message: contactFormData.message,
        timestamp: new Date()
      });
      setStatus("Form submitted successfully!");
      setShowModal(true);  // Show the modal on success
      setContactFormData({
        company: "",
        lastname: "",
        firstname: "",
        message: ""
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("Error submitting form");
    }
  };

  const closeModal = () => {
    setShowModal(false);  // Close the modal
  };

  return (
    <div className='wrapper-textarea'>
      <form onSubmit={handleSubmit}>
        <h3>Contact Us</h3>
        <p>Tell us how we can help and we’ll get in touch shortly.</p>

        <div className='input-box-textarea'>
          <input 
            type='text' 
            name='firstname' 
            placeholder='Enter first name' 
            id='fname' 
            autoComplete='off' 
            value={contactFormData.firstname} 
            onChange={handleChange} 
            required 
          />
          <FaUser className='icon'/>
        </div>

        <div className='input-box-textarea'>
          <input 
            type='text' 
            name='lastname' 
            placeholder='Enter last name' 
            id='lname' 
            autoComplete='off' 
            value={contactFormData.lastname} 
            onChange={handleChange} 
            required 
          />
          <FaUser className='icon'/>
        </div>

        <div className='input-box-textarea'>
          <input 
            type='text' 
            name='company' 
            placeholder='Enter company' 
            id='company' 
            autoComplete='off' 
            value={contactFormData.company} 
            onChange={handleChange} 
            required 
          />
          <PiBuildingOfficeBold className='icon'/> 
        </div>

        <div className='input-box-textarea'>
          <textarea 
            name="message" 
            cols="40" 
            rows="5" 
            placeholder="Tell us about your project or custom feature request" 
            maxLength="500" 
            required  
            wrap="soft"  
            spellCheck="true"
            autoFocus 
            value={contactFormData.message} 
            onChange={handleChange}>
          </textarea>
        </div> 

        <div className='input-box-textarea'>
          <button type="submit" className="btn btn-secondary">Submit</button>
        </div>
      </form>
      
      {/* {status && <p>{status}</p>} */}

      {/* Success Modal */}
      <SuccessModal show={showModal} handleClose={closeModal} />
    </div>
  )
}

export default Contact;
