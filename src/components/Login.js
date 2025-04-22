import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth(); // Removed loginWithGoogle
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }
  }

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', margin: '0 20px' }}>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '400px' }}>
        <input type="email" placeholder="Email" ref={emailRef} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }} />
        <input type="password" placeholder="Password" ref={passwordRef} required style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }} />
        <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Log In</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Need an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}