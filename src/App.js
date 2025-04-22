import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ReceiptGenerator from './components/ReceiptGenerator';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ThreeJSBackground from './components/ThreeJSBackground';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ThreeJSBackground />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ReceiptGenerator />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
