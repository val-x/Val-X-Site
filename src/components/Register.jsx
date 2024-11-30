import React from 'react'

function Register() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Contact Us</h1>
      <form style={{ width: '300px', textAlign: 'left' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required style={{ width: '100%', padding: '8px', marginTop: '5px' }}></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="referral">Referral Code:</label>
          <input type="text" id="referral" name="referral" style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </div>
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>Send</button>
      </form>
    </div>
  )
}

export default Register
