import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth(); // Removed loginWithGoogle
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to create an account');
    }
  }

  return (
    <div className="register-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', margin: '0 20px' }}>
      <h2>Register</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
        <input type="email" placeholder="Email" ref={emailRef} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }} />
        <input type="password" placeholder="Password" ref={passwordRef} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }} />
        <input type="password" placeholder="Confirm Password" ref={passwordConfirmRef} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }} />
        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Register</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}