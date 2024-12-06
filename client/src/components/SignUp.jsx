import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    feet: "",
    inches: "",
    weight: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await fetch("http://localhost:5050/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.error(error.errorMessage);
    } finally {
      setFormData({
        name: "",
        age: "",
        feet: "",
        inches: "",
        weight: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          {/* NAME */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your first name"
            required
          />
          {/* AGE */}
          <label htmlFor="age">Age</label>
          <input
            type="number"
            min="13"
            max="100"
            id="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="How old are you?"
          />

          {/* HEIGHT */}
          <label htmlFor="height">Height</label>
          <span className="height-span">
            <input
              type="number"
              min="3"
              max="8"
              id="feet"
              value={formData.feet}
              onChange={handleInputChange}
              placeholder="feet"
            />
            <input
              type="number"
              min="0"
              max="11"
              id="inches"
              value={formData.inches}
              onChange={handleInputChange}
              placeholder="inches"
            />
          </span>

          {/* WEIGHT */}
          <label htmlFor="weight">Weight</label>
          <input
            type="number"
            min="75"
            max="800"
            id="weight"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Enter weight"
          />

          {/* EMAIL */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter an email"
            required
          />

          {/* PASSWORD */}
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

        <button type="submit" className="login-btn">
          Sign Up
        </button>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}
