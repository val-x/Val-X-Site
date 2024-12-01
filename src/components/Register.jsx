import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    referral: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://formspree.io/f/mjkvppql', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '', referral: '' });
      }, 3000);
    } else {
      alert('Error submitting form');
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-header">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
        
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-group">
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder=" "
              rows="4"
            ></textarea>
            <label htmlFor="message">Message</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              id="referral"
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              placeholder=" "
            />
            <label htmlFor="referral">Referral Code</label>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
          >
            {isSubmitted ? 'Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
