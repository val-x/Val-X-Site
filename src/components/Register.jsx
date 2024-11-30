import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    referral: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', { // Replace with your Formspree endpoint
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      setFormData({ name: '', email: '', message: '', referral: '' }); // Reset form
    } else {
      alert('Error submitting form');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Contact Us</h1>
      <form style={{ width: '300px', textAlign: 'left' }} onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }}></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="referral">Referral Code:</label>
          <input type="text" id="referral" name="referral" value={formData.referral} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>Send</button>
      </form>
    </div>
  )
}

export default Register
