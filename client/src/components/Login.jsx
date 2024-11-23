import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../index.css"

export default function Login() {
    

    const navigate = useNavigate()
    // State to store email and password values
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleInputChange = (event) => {
      const { id, value } = event.target;
      setFormData({
        ...formData,
        [id]: value
      })
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload on form submit

        if (!formData.email || !formData.password) {
        setErrorMessage('Both fields are required.');
        return;
        }
        try {
          const response = await fetch('http://localhost:5050/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
          const result = await response.json()
          if (result.token != undefined && result.id != undefined) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('id', result.id)  
          }
          else {
            alert('Email/Password is incorrect. Please try again.')
          }
          navigate('/profile'); 
        } catch (error) {
          console.error(error.errorMessage)
        } finally {
          setFormData({
            email: '',
            password: ''
          })
        }
    };

    return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={ handleInputChange }
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <button type="submit" className="login-btn">
          Login
        </button>
        <Link to="/signup">
        Sign Up
        </Link>
      </form>
    </div>
    )
}
